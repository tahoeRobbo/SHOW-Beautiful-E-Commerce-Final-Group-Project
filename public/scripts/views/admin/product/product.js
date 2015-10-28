var Product = function(){
	this.productTitle = "";
	this.productDescription = "";
	this.productCategory = "";
	this.images = [];
	this.price = "";
  	this.colorSize = [];

	this.addColorSize = function(newColorSize){
		this.colorSize.push(newColorSize);
	}

	this.addImg = function(newImage){
		this.images.push(newImage);
	}

	this.deleteColorSize = function(toBeDeleted){
    console.log("deleteFunc", this.colorSize);
    console.log("deleteFunc", toBeDeleted);
		for (var i = 0; i < this.colorSize.length; i++){
			if (this.colorSize[i].$$hashKey === toBeDeleted.$$hashKey){
        this.colorSize.splice(i, 1);
			}
		}
    console.log(this.colorSize);
	}


}; 