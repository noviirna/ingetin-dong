module.exports = function() {
		let generatedId = "";
		let characterList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz"
	
		for(let count = 1; count <= 16; count++){
			generatedId += characterList.charAt(Math.floor(Math.random()*characterList.length));
			if(count % 4 == 0 && count < 16){
				generatedId += "-";
			}
		}
		return generatedId;
};
