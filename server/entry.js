export default router => {
	router.use('/api', require('./api').default);
	router.use(require('./loader').default);
};
