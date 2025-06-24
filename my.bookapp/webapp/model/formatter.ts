export default {
	formatValue: (value: string) => {
		return value?.toUpperCase();
	},
	formatDate: (value: string) => {
    return new Date(value).toLocaleString("de-DE", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }
};
