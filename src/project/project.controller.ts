import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { query } from 'express';

@Controller('project')
export class ProjectController {

	private users: User[] = [
		{
			uid: '1',
			name: 'lzx',
		}, {
			uid: '2',
			name: 'hff',
		}, {
			uid: '3',
			name: 'lyh',
		}
	]

	private pid_authorLst: Map<string, Author[]> = new Map([
		['1', [
			{
				user: {
					uid: '1',
					name: 'lzx',
				},
				role: 'admin',
			}, {
				user: {
					uid: '2',
					name: 'hff',
				},
				role: 'teamworker'
			}, {
				user: {
					uid: '3',
					name: 'lyh',
				},
				role: 'visitor'
			}
		]],
		['2', [
			{
				user: {
					uid: '1',
					name: 'lzx',
				},
				role: 'admin',
			}
		]],
		['3', [
			{
				user: {
					uid: '1',
					name: 'lzx',
				},
				role: 'admin',
			}
		]],
		['4', [
			{
				user: {
					uid: '1',
					name: 'lzx',
				},
				role: 'admin',
			}
		]],
		['5', [
			{
				user: {
					uid: '1',
					name: 'lzx',
				},
				role: 'admin',
			}
		]],
		['6', [
			{
				user: {
					uid: '1',
					name: 'lzx',
				},
				role: 'admin',
			}
		]],
	])

	private projectList: Project[] = [{
		id: 1,
		overviewImg: 'https://fc1tn.baidu.com/it/u=4244377917,516112550&fm=202&mola=new&crop=v1',
		projectName: '国内疫情数据',
	}, {
		id: 2,
		overviewImg: "https://img1.baidu.com/it/u=610294292,2843231202&fm=253&fmt=auto&app=138&f=GIF?w=669&h=500",
		projectName: "2017世乒赛男单决赛",
	}, {
		id: 3,
		overviewImg: "https://img2.baidu.com/it/u=4189556329,2001164136&fm=253&fmt=auto&app=138&f=PNG?w=763&h=500",
		projectName: "Story Line",
	}, {
		id: 4,
		overviewImg: "https://img1.baidu.com/it/u=610294292,2843231202&fm=253&fmt=auto&app=138&f=GIF?w=669&h=500",
		projectName: "2017世乒赛男单决赛",
	}, {
		id: 5,
		overviewImg: "https://img1.baidu.com/it/u=610294292,2843231202&fm=253&fmt=auto&app=138&f=GIF?w=669&h=500",
		projectName: "2017世乒赛男单决赛",
	}, {
		id: 6,
		overviewImg: "https://img1.baidu.com/it/u=610294292,2843231202&fm=253&fmt=auto&app=138&f=GIF?w=669&h=500",
		projectName: "2017世乒赛男单决赛",
	},
	];

	@Get()
	findAllProject(@Query() query): Project[] {  //  find by uid
		console.log('get', query);
		return this.projectList;
	}

	@Get('authority')
	getAuthority(@Query() query): Author[] {
		console.log('author query', query);
		return this.pid_authorLst.get(query.id);
	}

	@Get('findAllUser')
	findAllUser(): User[] {
		return this.users;
	}

	@Post('addMember')
	addMember(@Body() param) {
		const tmp = this.pid_authorLst.get(param.projectId);
		console.log(param, tmp);
		tmp.push(param.author);
		this.pid_authorLst.set(param.projectId, tmp);
	}

	@Post('deleteMember')
	deleteMember(@Body() param) {
		let tmp = this.pid_authorLst.get(param.projectId);
		tmp = tmp.filter((item) => item.user.uid != param.uid);
		this.pid_authorLst.set(param.projectId, tmp);
	}

	@Post('editMember')
	editMember(@Body() param) {
		let tmp = this.pid_authorLst.get(param.projectId);
		tmp = tmp.map((item) => {
			if (item.user.uid === param.uid) {
				return {
					user: item.user,
					role: param.role
				};
			}
			return item;
		});
		console.log('editMember',tmp, param);
		this.pid_authorLst.set(param.projectId, tmp);
	}

	@Get('delete')
	delProjectById(@Query() query): void {  //  find by uid
		console.log('delete', query);
		const { id } = query;
		this.projectList = this.projectList.filter(prj => prj.id != id);
	}

	@Post('createProject')
	createProject(@Body() param) {
		this.projectList.push(param);
	}
}
