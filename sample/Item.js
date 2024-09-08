function Item(){

    this.type='Item';
    this.itemCode=null;
    this.itemDesc=null;
    this.reOrderLevel=null;
    this.stockQunatity=null;
    this.vatCode=null;
    this.stockValue=null;
}

Item.prototype.getItemCode=function(){
    return this.itemCode;
}

Item.prototype.setItemCode=function(itemCode){
     this.itemCode = itemCode;
}

Item.prototype.getItemDesc=function(){
    return this.itemDesc;
}

Item.prototype.setItemDesc=function(itemDesc){
     this.itemDesc = itemDesc;
}

Item.prototype.getReOrderLevel=function(){
    return this.reOrderLevel;
}

Item.prototype.setReOrderLevel=function(reOrderLevel){
     this.reOrderLevel = reOrderLevel;
}

Item.prototype.getStockQunatity=function(){
    return this.stockQunatity;
}

Item.prototype.setStockQunatity=function(stockQunatity){
     this.stockQunatity = stockQunatity;
}

Item.prototype.getVatCode=function(){
    return this.vatCode;
}

Item.prototype.setVatCode=function(vatCode){
     this.vatCode = vatCode;
}

Item.prototype.getStockValue=function(){
    return this.stockValue;
}

Item.prototype.setStockValue=function(stockValue){
     this.stockValue = stockValue;
}

