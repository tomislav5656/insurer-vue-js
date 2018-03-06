import Vue from 'vue'
export class RiskType{
	constructor(initializer){

		this.name = initializer.name
		this.properties = initializer.properties
		this.id  = initializer._id.$oid
		this._id = initializer._id
		this.type = initializer.type

	}
}
