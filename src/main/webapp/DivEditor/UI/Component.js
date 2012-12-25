DivEditor.UI.Component = function(properties) {
  
  this.element = null;
  this.parentElement = null;
  this.tagName = 'div';
  this.className = '';
  this.eventBinds = [];
  
  this.putProperties(properties);
  
  this.make();
  this.init();
  
}

DivEditor.UI.Component.prototype.putProperties = function(properties) {
  
  for (var property in properties) {
    if (this[property] != 'undefined') {
      this[property] = properties[property];
    }
  }
  
}

DivEditor.UI.Component.prototype.make = function() {
  
  if (this.parentElement) {
    
    if (!this.element) {
    
      this.element = this.parentElement.append('<' + this.tagName + ' class="' + this.className + '"></' + this.tagName + '>').children('.' + this.className);
    
    }
    
  }
  
}

DivEditor.UI.Component.prototype.init = function() {
  
  this.bindEvents();
  this.refresh();
  
}

DivEditor.UI.Component.prototype.refresh = function() {
}

DivEditor.UI.Component.prototype.addEventBind = function(eventBind) {
  
  this.bindEvent(eventBind);
  this.eventBinds.push(eventBind);
  
}

DivEditor.UI.Component.prototype.bindEvent = function(eventBind) {
  
  if (eventBind) {
    
    if (eventBind.eventType && eventBind.handler) {
      
      $(this.element).bind(
        eventBind.eventType,
        eventBind.handler
      );
      
    }
    
  }
  
}

DivEditor.UI.Component.prototype.bindEvents = function() {
  
  for (var i = 0; i < this.eventBinds.length; i++) {
    
    this.bindEvent(this.eventBinds[i]);
    
  }
  
}