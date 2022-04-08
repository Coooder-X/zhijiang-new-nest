import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller('dataset')
export class DatasetController {
	private uid_dataset: Map<string, TreeData[]> = new Map([
		['22151123', [
			{
				id: "1",
				label: "Covid-19疫情数据",
				type: FileType.Category,
				children: [
					{
						id: "12",
						label: "国内疫情数据",
						type: FileType.File,
					},
					{
						id: "123",
						label: "肺炎图片数据集",
						type: FileType.Folder,
						children: [
							{ id: "1234", label: "image1.jpg", type: FileType.File },
						],
					},
				],
			},
			{
				id: "2",
				label: "Twitter数据集",
				type: FileType.Category,
				children: [
					{
						id: "22",
						label: "聊天记录",
						type: FileType.File,
					},
				],
			},
		]]
	]);

	private dfsDelete(fid: string, tree: TreeData[]) {
		let f = -1;
		for (let i = 0; i < tree.length; ++i) {
			if (tree[i].id === fid) {
				f = i;
				break;
			}
		}
		if (f !== -1) {
			tree.splice(f, 1);
			return;
		}
		for (let i = 0; i < tree.length; ++i) {
			if (tree[i].children)
				this.dfsDelete(fid, tree[i].children);
		}
	}

	private dfsRename(fid: string, newName: string, tree: TreeData[]) {
		for (let i = 0; i < tree.length; ++i) {
			if (tree[i].id === fid) {
				tree[i].label = newName;
				return;
			}
		}
		for (let i = 0; i < tree.length; ++i) {
			if (tree[i].children)
				this.dfsRename(fid, newName, tree[i].children);
		}
	}

	@Get()
	getDataSet(@Query() query): TreeData[] {
		console.log('getdata', query);
		return this.uid_dataset.get(query.uid);
	}

	@Post('createCategory')
	createCategory(@Body() param) {
		console.log(param);
		this.uid_dataset.get(param.uid).push(param.data);
	}

	@Post('deleteFolder')
	deleteFolder(@Body() param) {
		const tmp = this.uid_dataset.get(param.uid);
		this.dfsDelete(param.fid, tmp)
		this.uid_dataset.set(param.uid, tmp);
	}
	
	@Post('renameFolder')
	renameFolder(@Body() param) {
		const { uid, fid, newName } = param;
		const tmp = this.uid_dataset.get(uid);
		this.dfsRename(fid, newName, tmp)
		this.uid_dataset.set(param.uid, tmp);
	}

	@Post('uploadFile')
	uploadFile(@Body() param) {
		const { uid, folder, fileName, newFid } = param;
		const { id } = folder;
		const tmp = this.uid_dataset.get(uid);
		const newFile: TreeData = {
			type: FileType.File,
			id: newFid,
			label: fileName
		}
		for (let folder of tmp) {
			if (folder.id === id) {
				folder.children.push(newFile);
				break;
			}
		}
		this.uid_dataset.set(param.uid, tmp);
	}
}
enum FileType {
	Category,
	Folder,
	File,
}