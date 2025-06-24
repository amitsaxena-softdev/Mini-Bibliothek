import JSONModel from "sap/ui/model/json/JSONModel";
import BindingMode from "sap/ui/model/BindingMode";

import Device from "sap/ui/Device";


export default {
	createDeviceModel: () => {
		const oModel = new JSONModel(Device);
		oModel.setDefaultBindingMode(BindingMode.OneWay);
		return oModel;
	},
	createBookModel: () => {
		const oModel = new JSONModel();
		oModel.setDefaultBindingMode(BindingMode.TwoWay);
		return oModel;
	}
};
