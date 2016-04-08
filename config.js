const getConfig = () => {
  return {
    port: process.env.PORT || 5000,

    kik: {
      apiKey: '6a511c50-76b9-492a-9629-6038e2743f1c',
    },
    gcloud: {
      projectId: process.env.GCLOUD_PROJECT || 'fashionm-1267',
    },
  };
};

export default getConfig();
