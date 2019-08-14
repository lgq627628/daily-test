// 保存当前Range
function saveCurrentRange () {
    // 获取selection对象
    const selection = window.getSelection ? window.getSelection() : document.getSelection()
      if (!selection.rangeCount) {
        return
      }
      const content = this.$refs.content
      for (let i = 0; i < selection.rangeCount; i++) {
        // 从selection中获取第一个Range对象
        const range = selection.getRangeAt(0)
        let start = range.startContainer
        let end = range.endContainer
        // 兼容IE11 node.contains(textNode) 永远 return false的bug
        start = start.nodeType === Node.TEXT_NODE ? start.parentNode : start
        end = end.nodeType === Node.TEXT_NODE ? end.parentNode : end
        if (content.contains(start) && content.contains(end)) {
        // Range对象被保存在this.range 
          this.range = range
          break
        }
      }
}

// 设置Range对象
function restoreSelection () {
    // 首先获取selection对象并清除当前的Range
      const selection = window.getSelection ? window.getSelection() : document.getSelection()
      selection.removeAllRanges()
      // 从this.range中获得保存的Range设置为Selection的Range对象
      if (this.range) {
        selection.addRange(this.range)
      } else {
        // 如果之前没有保存Range则新建一个
        const content = this.$refs.content
        const row = RH.prototype.newRow({br: true})
        const range = document.createRange()
        content.appendChild(row)
        range.setStart(row, 0)
        range.setEnd(row, 0)
        selection.addRange(range)
        this.range = range
      }
    }


    getCurrentRange = function() {   

        var sel = window.getSelection();   
      
        if (sel.getRangeAt && sel.rangeCount) {   
      
          return sel.getRangeAt(0);   
      
        }   
      
      },   
      
      saveSelection = function() {   
      
        selectedRange = getCurrentRange();   
      
      },   
      
      restoreSelection = function() {   
      
        var selection = window.getSelection();   
      
        if (selectedRange) {   
      
          try {   
      
            selection.removeAllRanges();   
      
          } catch (ex) {   
      
            document.body.createTextRange().select();   
      
            document.selection.empty();   
      
          }  
      
          selection.addRange(selectedRange);   
      
        }   
      
      }
      
      著作权归作者所有。
      商业转载请联系作者获得授权,非商业转载请注明出处。
      原文: http://ghmagical.com/article/page/id/uMXiMenCofsB © ghmagical.com