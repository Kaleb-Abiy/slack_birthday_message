import axios from 'axios';

export default async ({ schedule }, { services, database, getSchema }) => {
	const { ItemsService } = services

	schedule("0 0 * * *", async () => {
		const today = new Date();
		const SLACK_WEBHOOK_URL = 'your webhook url';
		const todayMonthDay = `${today.getMonth() + 1}-${today.getDate()}`;

		let birthdayUsers;
		const users = new ItemsService("users", {
			database,
			schema: await getSchema(),
		})

	

		try
		{
			//WE NEED MOST OF THE DATAS FROM DATABASE
			const userList = await users.readByQuery({ fields: ['*'] })

			if (userList.length == 0) return;

			birthdayUsers = userList.filter(user => {
				const userBirthday = new Date(user.birth_date);
				const userBirthdayMonthDay = `${userBirthday.getMonth() + 1}-${userBirthday.getDate()}`;
				return userBirthdayMonthDay === todayMonthDay;
			});

			if (birthdayUsers.length == 0) return;

			birthdayUsers.map(user=> {
				sendBirthdayMessage(user.full_name)
			})
		}
		catch (err)
		{
			console.log('ERROR::', err)
		}
		function sendBirthdayMessage(name)
		{
			axios.post(SLACK_WEBHOOK_URL, {
				"text": `Happy Birth Day ${name}`
			})
		}

	})
};
