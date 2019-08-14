<template>
  <div>
    <div class="nav">
      <button @click="execCommand('bold')">加粗</button>
      <button @click="execCommand('formatBlock', '<p>')">段落</button>
      <button @click="showHead = !showHead" class="nav__head">H
        <ul v-if="showHead">
          <li v-for="n in 6" :key="n" @click="execCommand('formatBlock', `<h${n}>`)">H{{n}}</li>
        </ul>
      </button>
      <button @click="execCommand('insertUnorderedList')">无序列表</button>
      <button @click="execCommand('insertHorizontalRule')">水平线</button>
      <button @click="createLink">链接</button>
      <button @click="insertImgLink">图片链接</button>
      <button class="nav__img">插入图片
        <input type="file" accept="image/gif, image/jpeg, image/png" @change="insertImg">
      </button>
      <button @click="execCommand('undo')">后退一步</button>
      <button @click="execCommand('redo')">向前一步</button>
    </div>
    <div class="editor" contenteditable="true" @input="print"></div>
    <div class="content">{{html}}</div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'XrEditor',
  data() {
    return {
      html: '',
      showHead: false,
      editor: null,
      boxes: [],
      overlay: null,
      nowImg: null,
      dragBox: null,
      dragStartX: 0,
      preDragWidth: 0
    };
  },
  mounted() {
    this.execCommand('defaultParagraphSeparator', 'p');
    this.execCommand('enableObjectResizing', 'false');
    // document.execCommand('enableObjectResizing', false, 'false');
    // let editor = document.querySelector('.editor');
    // editor.addEventListener('keydown', function(e) {
    // 	if (e.key === 'Enter' && document.queryCommandValue('formatBlock', '<p>')) {
    // 		this.execCommand('formatBlock', '<p>');
    // 	}
    // })
    // 因为各个浏览器在标记生成上的不同，因此跨浏览器使用 contenteditable 一直以来都是痛点，例如一些看起来十分简单的事情，如： 当你按下Enter/Return键在可编辑区域中创建一个新的文本行时，不同主流浏览器对此有不同处理(Firefox 插入<br>、IE/Opera将使用<p>、 Chrome/Safari 将使用 <div>）
    // 幸运的是在现代浏览器中，这些不同都趋于一致了。截止到Firefox 60，火狐开始使用<div>元素来包裹新生成的文本行，以与Chrome, modern Opera, Edge, and Safari.的行为趋于一致
    // 注意: Internet Explorer使用 <p> 元素而不是 <div>.
    this.editor = document.querySelector('.editor');
    this.editor.addEventListener('click', this.handleClick, false);
  },
  methods: {
    // 封装 document.execCommand 指令
    execCommand(name, args = null) {
      // document.execCommand('styleWithCSS', null, true)
      document.execCommand(name, false, args);
      this.focus();
    },
    // 插入链接
    createLink() {
      let url = window.prompt('请输入 url 地址');
      this.focus();
      if (url) this.execCommand('createLink', url);
    },
    // 插入图片地址
    insertImgLink() {
      let url = window.prompt('请输入图片地址');
      this.focus();
      if (url) this.execCommand('insertImage', url);
    },
    // 插入图片功能
    insertImg(e) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onload = () => {
        let base64Image = reader.result;
        this.execCommand('insertImage', base64Image);
      };
      reader.readAsDataURL(file);
      document.querySelector('.nav__img input').value = '';
    },
    handleClick(e) {
      console.log(e.target);
      if (
        e.target &&
        e.target.tagName &&
        e.target.tagName.toUpperCase() === 'IMG'
      ) {
        if (this.nowImg === e.target) return; // 点击同一张照片
        if (this.nowImg) {
          console.log('111');
          this.hide(); // 点击另一张照片
        }
        this.handleClickImg(e.target);
      } else if (this.nowImg) {
        console.log('2222');
        this.hide();
      }
    },
    hide() {
      this.hideOverlay();
      this.nowImg = null;
    },
    hideOverlay() {
      if (!this.overlay) return;

      this.editor.removeChild(this.overlay);
      this.overlay = null;

      // stop listening for image deletion or movement
      document.removeEventListener('keyup', this.checkImage, true);

      this.setUserSelect('');
    },
    handleClickImg(img) {
      this.nowImg = img;
      this.showOverlay();
    },
    showOverlay() {
      if (this.overlay) this.hideOverlay();
      // this.editor.setSelection(null);
      this.setUserSelect('none');

      document.addEventListener('keyup', this.checkImage, true);

      this.overlay = document.createElement('div');
      this.editor.appendChild(this.overlay);
      this.repositionOverlay();
    },
    checkImage(e) {
      if (this.nowImg) {
        // console.log(e, this.editor, this.nowImg);
        this.hide();
        if (e.keyCode === 8 && this.nowImg) {
          this.editor.removeChild(this.nowImg);
        }
      }
    },
    createBox() {
      this.boxes = [];
      this.addBox('nwse-resize'); // top left
      this.addBox('nesw-resize'); // top right
      this.addBox('nwse-resize'); // bottom right
      this.addBox('nesw-resize'); // bottom left
      this.positionBoxes();
    },
    repositionOverlay() {
      let imgRect = this.nowImg.getBoundingClientRect();
      let editorRect = this.editor.getBoundingClientRect();
      Object.assign(this.overlay.style, {
        top: `${imgRect.top - editorRect.top + this.editor.scrollTop}px`,
        left: `${imgRect.left -
          editorRect.left -
          1 +
          this.editor.scrollLeft}px`,
        width: `${imgRect.width}px`,
        height: `${imgRect.height}px`,
        position: 'absolute',
        boxSizing: 'border-box',
        border: '1px dashed red'
      });
      this.createBox();
    },
    addBox(cursor) {
      // create div element for resize handle
      const box = document.createElement('div');

      // Star with the specified styles
      Object.assign(box.style, {
        position: 'absolute',
        height: '12px',
        width: '12px',
        backgroundColor: 'white',
        border: '1px solid #777',
        boxSizing: 'border-box',
        opacity: '0.80'
      });
      box.style.cursor = cursor;

      // listen for mousedown on each box
      box.addEventListener('mousedown', this.handleMousedown);
      // add drag handle to document
      this.overlay.appendChild(box);
      // keep track of drag handle
      this.boxes.push(box);
    },
    handleMousedown(e) {
      // note which box
      this.dragBox = e.target;
      // note starting mousedown position
      this.dragStartX = e.clientX;
      // store the width before the drag
      this.preDragWidth = this.nowImg.width;
      // set the proper cursor everywhere
      this.setCursor(this.dragBox.style.cursor);
      document.addEventListener('mousemove', this.handleDrag);
      document.addEventListener('mouseup', this.handleMouseup);
    },
    handleDrag(e) {
      // 水平拖动距离
      const deltaX = e.clientX - this.dragStartX;
      if (this.dragBox === this.boxes[0] || this.dragBox === this.boxes[3]) {
        // 左边拖
        // left-side resize handler; dragging right shrinks image
        this.nowImg.width = Math.round(this.preDragWidth - deltaX);
      } else {
        // 右边拖
        // right-side resize handler; dragging right enlarges image
        this.nowImg.width = Math.round(this.preDragWidth + deltaX);
      }
      this.repositionOverlay();
    },
    handleMouseup() {
      // reset cursor everywhere
      this.setCursor('');
      // stop listening for movement and mouseup
      document.removeEventListener('mousemove', this.handleDrag);
      document.removeEventListener('mouseup', this.handleMouseup);
      return false;
    },
    setCursor(value) {
      [document.body, this.nowImg].forEach(el => {
        el.style.cursor = value; // eslint-disable-line no-param-reassign
      });
    },
    setUserSelect(value) {
      this.editor.style['userSelect'] = value;
      document.documentElement.style['userSelect'] = value;
    },
    setSelection() {},
    positionBoxes() {
      let handleXOffset = `-6px`;
      let handleYOffset = `-6px`;
      // set the top and left for each drag handle
      [
        { left: handleXOffset, top: handleYOffset }, // top left
        { right: handleXOffset, top: handleYOffset }, // top right
        { right: handleXOffset, bottom: handleYOffset }, // bottom right
        { left: handleXOffset, bottom: handleYOffset } // bottom left
      ].forEach((pos, idx) => {
        Object.assign(this.boxes[idx].style, pos);
      });
    },
    focus() {
      let editor = document.querySelector('.editor');
      editor && editor.focus();
    },
    print(e) {
      if (e.target.firstChild && e.target.firstChild.nodeType === 3) {
        this.execCommand('formatBlock', '<p>');
      } else if (
        document.querySelector('.editor').innerHTML === '<p><br></p>' ||
        document.querySelector('.editor').innerHTML === '<br>'
      ) {
        document.querySelector('.editor').innerHTML = '';
      }
      this.html = document.querySelector('.editor').innerHTML;
    }
  }
};
</script>

<style lang="scss">
.nav {
  display: flex;
  button {
    cursor: pointer;
  }
  &__head {
    position: relative;
    ul {
      position: absolute;
      top: 12px;
      left: 0;
      padding: 0;
      list-style: none;
      border: 1px solid #000;
      background: #fff;
      li {
        padding: 3px 5px;
        &:not(:nth-last-of-type(1)) {
          border-bottom: 1px solid #000;
        }
      }
    }
  }
  &__img {
    position: relative;
    input {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
    }
  }
}
.editor {
  position: relative;
  padding: 10px;
  width: 500px;
  height: 400px;
  outline: none;
  border: 1px solid #000;
  overflow-y: scroll;
  img {
    max-width: 300px;
    max-height: 300px;
    vertical-align: bottom;
  }
  p {
    margin: 0;
  }
}
.content {
  width: 500px;
  height: 400px;
  border: 1px solid #000;
  word-break: break-all;
  word-wrap: break-word;
  overflow: scroll;
}
</style>
