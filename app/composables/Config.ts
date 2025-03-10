export const useConfig = () => {
  const config = useState("config", () => {
    return {
      editMode: false,
      modalComponent: "null",
      modalContent: null,
      showModal: false,
    };
  });
  const setConfig = (newConfig: any) => {
    config.value = { ...config.value, ...newConfig };
  };

  return { config, setConfig };
};
