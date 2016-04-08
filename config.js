const getConfig = () => {
  return {
    port: process.env.PORT || 5000,

    kik: {
      username: 'crush.bot',
      apiKey: 'e77f9ecb-79e6-403b-bed5-39567d0993f4',
      baseUrl: 'https://e13c01a2.ngrok.io',
    },
    gcloud: {
      projectId: process.env.GCLOUD_PROJECT || 'fashionm-1267',
    },
  };
};

export default getConfig();
