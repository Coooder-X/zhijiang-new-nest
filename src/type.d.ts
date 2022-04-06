interface Project {
	id: number;
	overviewImg: string;
	projectName: string;
	// authorList: Author[];
}

interface Author {
	user: User
	role: 'admin' | 'teamworker' | 'visitor';
}

interface User {
	uid: string;
	name: string;
}