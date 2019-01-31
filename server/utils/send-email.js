import nodeMailer from 'nodemailer';
import getPrivateFile from './get-file';
import templateToText from './hbs-email-to-text';
import templateToHTML from './hbs-email-to-html';

/*
    USAGE GUIDE:
    sendEmail({
        to: emailAddress, ------ EMAIL ADRESS RECIPIENT
        from: supportEmail, ------ SENDER ADRESS NODEMAILER API GOWORIT EXAMPLE - "Krunal Lathiya" <xx@gmail.com>
        subject: `[CodeNameVero] Welcome, ${name}!`,
        template: 'verification',
        templateVars: {
            title: `Account verification!`,
            name: req.user.name,
            email: req.user.email,
            verifyUrl: ......
        },
  })


*/
const transporter = nodeMailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});
// TODO: Nodemail will  be here
const sendEmail = (options, { resolve, reject }) => {
	try {
		transporter.sendMail(options, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log(info);
			return resolve();
		});
	} catch (exception) {
		reject(exception);
	}
};

// TODO: Hbs parse
export default ({ text, html, template, templateVars, ...rest }) => {
	if (text || html || template) {
		return new Promise((resolve, reject) => {
			sendEmail(
				{
					...rest,
					text: template
						? templateToText(
							getPrivateFile(
								`emailTemplates/${template}.txt`
							),
							templateVars || {}
						  )
						: text,
					html: template
						? templateToHTML(
							getPrivateFile(
								`emailTemplates/${template}.html`
							),
							templateVars || {}
						  )
						: html,
				},
				{ resolve, reject }
			);
		});
	}
	throw new Error(
		"Please pass an HTML string, text, or template name to compile for your message's body."
	);
};
