import handlebars from 'handlebars';
import juice from 'juice';
import getPrivateFile from './get-file';

export default (handlebarsMarkup, context, options) => {
	if (handlebarsMarkup && context) {
		const template = handlebars.compile(handlebarsMarkup);
		const content = template(context);

		if (options && options.noBaseTemplate) {
			// Use juice to inline CSS <style></style> styles from <head> unless disabled.
			return options && !options.inlineCss ? content : juice(content);
		}

		const layout = handlebars.compile(
			getPrivateFile('emailTemplates/layout.html')
		);

		const layoutContext = {
			...context,
			content,
		};

		return options && !options.inlineCss
			? layout(layoutContext)
			: juice(layout(layoutContext));
	}

	throw new Error(
		'[Pup] Please pass Handlebars markup to compile and a context object with data mapping to the Handlebars expressions used in your template (e.g., {{expressionToReplace}}).'
	);
};
