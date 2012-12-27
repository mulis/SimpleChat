DivEditor = function(element) {
  
  var me = this;
  
  if (!rangy.initialized) {
    rangy.init();
  }
  
  var boldApplier = rangy.createCssClassApplier('divEditor-bold', {elementTagName: 'b', applyToEditableOnly : true, normalize: true});
  var italicApplier = rangy.createCssClassApplier('divEditor-italic', {elementTagName: 'i', applyToEditableOnly : true, normalize: true});
  var underlineApplier = rangy.createCssClassApplier('divEditor-underline', {elementTagName: 'u', applyToEditableOnly : true, normalize: true});
  var strikethroughApplier = rangy.createCssClassApplier('divEditor-strikethrough', {elementTagName: 's', applyToEditableOnly : true, normalize: true});
  var anchorApplier = rangy.createCssClassApplier('divEditor-anchor', {elementTagName: 'a', elementProperties : {href : 'http://example.com'}, applyToEditableOnly : true, normalize: true});
  
  me.element = $(element);
  
  var mainPanel = new DivEditor.UI.Panel({
    parentElement : me.element,
    className : 'divEditor-panel-main'
  });
  
  var buttonPanel = new DivEditor.UI.Panel({
    parentElement : mainPanel.element,
    className : 'divEditor-panel-buttons'
  });
  
  var stylePanel = new DivEditor.UI.Panel({
    parentElement : buttonPanel.element,
    className : 'divEditor-panel-styles'
  });
  
  stylePanel.addComponent(new DivEditor.UI.Button({
    className : 'divEditor-button-bold',
    text : 'bold',
    eventBinds : [{eventType : 'click', handler : function() {me.applyStyle(boldApplier);}}]
  }));
  
  stylePanel.addComponent(new DivEditor.UI.Button({
    className : 'divEditor-button-italic',
    text : 'italic',
    eventBinds : [{eventType : 'click', handler : function() {me.applyStyle(italicApplier);}}]
  }));
  
  stylePanel.addComponent(new DivEditor.UI.Button({
    className : 'divEditor-button-underline',
    text : 'undelrine',
    eventBinds : [{eventType : 'click', handler : function() {me.applyStyle(underlineApplier);}}]
  }));
  
  stylePanel.addComponent(new DivEditor.UI.Button({
    className : 'divEditor-button-strikethrough',
    text : 'strikethrough',
    eventBinds : [{eventType : 'click', handler : function() {me.applyStyle(strikethroughApplier);}}]
  }));
  
  stylePanel.addComponent(new DivEditor.UI.Button({
    className : 'divEditor-button-anchor',
    text : 'link',
    eventBinds : [{eventType : 'click', handler : function() {me.applyStyle(anchorApplier);}}]
  }));
  
  var emoticonPanel = new DivEditor.UI.Panel({
    parentElement : buttonPanel.element,
    className : 'divEditor-panel-emoticons'
  });
  
  emoticonPanel.addComponent(new DivEditor.UI.Button({
    className : 'divEditor-button-emoticon-happy',
    text : 'happy'
  }));
  
  emoticonPanel.addComponent(new DivEditor.UI.Button({
    className : 'divEditor-button-emoticon-smile',
    text : 'smile'
  }));
  
  emoticonPanel.addComponent(new DivEditor.UI.Button({
    className : 'divEditor-button-emoticon-surprised',
    text : 'surprised'
  }));
  
  emoticonPanel.addComponent(new DivEditor.UI.Button({
    className : 'divEditor-button-emoticon-tongue',
    text : 'tongue'
  }));
  
  emoticonPanel.addComponent(new DivEditor.UI.Button({
    className : 'divEditor-button-emoticon-unhappy',
    text : 'unhappy'
  }));
  
  emoticonPanel.addComponent(new DivEditor.UI.Button({
    className : 'divEditor-button-emoticon-wink',
    text : 'wink'
  }));
  
  emoticonPanel.element.on(
    'click',
    'button',
    function(aEvent) {
      me.insertEmoticon(aEvent.target);
    }
  );
  
  var editPanel = new DivEditor.UI.Panel({
    parentElement : mainPanel.element,
    className : 'divEditor-panel-edit'
  });

  me.input = new DivEditor.UI.TextEdit({
    className : 'divEditor-textEdit',
    text : ''
  });

  editPanel.addComponent(me.input);
  
  var linkEditFlyPanel = new DivEditor.UI.FlyPanel({
    parentElement : editPanel.element,
    className : 'divEditor-flyPanel-linkEdit'
  });
  
  var linkEdit = new DivEditor.UI.TextEdit({
    className : 'divEditor-textEdit',
    text : ''
  });
  
  linkEditFlyPanel.addComponent(linkEdit);
  
  editPanel.element.on(
    'mouseover',
    '.divEditor-anchor',
    function(aEvent) {
      if (aEvent.which != 1) {
        var anchor = aEvent.target;
        linkEditFlyPanel.element.show();
        linkEdit.element.focus();
        linkEdit.putProperties({text : anchor.href});
        linkEdit.refresh();
        linkEdit.element.on(
          'mouseout',
          function(aEvent) {
            anchor.href = linkEdit.element.text();
            linkEdit.element.off('mouseout');
          }
        );
      }
    }
  );
  
  editPanel.element.on(
    'mouseout',
    '.divEditor-anchor',
    function(aEvent) {
      if ($(aEvent.toElement).closest('.' + linkEditFlyPanel.className).length < 0) {
        $(aEvent.target).attr('href', linkEdit.element.text());
        linkEditFlyPanel.element.hide();
      }
    }
  );
  
  linkEditFlyPanel.element.on(
    'mouseover',
    function(aEvent) {
    }
  );
  
  linkEditFlyPanel.element.on(
    'mouseout',
    function(aEvent) {
      linkEditFlyPanel.element.hide();
    }
  );
  
}

DivEditor.prototype.applyStyle = function(appllier) {
  
  var selection = rangy.getSelection();
  
  if (selection.rangeCount) {
    
    var range = selection.getRangeAt(0);
    
    if (!range.collapsed) {
      
      if ($(range.commonAncestorContainer).closest(this.input.element).length > 0) {
      
        appllier.toggleSelection();
      
      }
      
    }
    
  }
  
}

DivEditor.prototype.insertEmoticon = function(button) {
  
  var selection = rangy.getSelection();
  
  if (selection.rangeCount) {
    
    var range = selection.getRangeAt(0);
    
    if (range.collapsed) {
      
      if ($(range.commonAncestorContainer).closest(this.input.element).length > 0) {
        
        var element = document.createElement('img');
        
        element.src = $(button).css('backgroundImage').match(/url\((.*)\)/)[1];
        
        range.insertNode(element);
        range.collapseAfter(element);

        selection.collapseToEnd();

      }
      
    }
    
  }
  
}

DivEditor.prototype.getInputElement = function() {

    return this.input.element;

}
