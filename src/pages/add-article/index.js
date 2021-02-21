import React, { memo, useEffect, useState } from "react";
import marked from "marked";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import moment from "moment";

import { AddArticleWrapper } from "./style";
import { listArticleType } from "@/service/articleType";
import { saveArticle, updateArticle, getArticle } from "@/service/article";

export default memo(function AddArticle(props) {
	const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
	const [articleTitle, setArticleTitle] = useState(""); //文章标题
	const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
	const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
	const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
	const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
	const [showDate, setShowDate] = useState(); //发布日期
	const [updateDate, setUpdateDate] = useState(); //修改日志的日期
	const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
	const [selectedType, setSelectType] = useState(1); //选择的文章类别
	const [userInfo, setUserInfo] = useState({});
	marked.setOptions({
		renderer: marked.Renderer(),
		gfm: true,
		pedantic: false,
		sanitize: false,
		tables: true,
		breaks: false,
		smartLists: true,
		smartypants: false,
	});
	const changeContent = (e) => {
		setArticleContent(e.target.value);
		let html = marked(e.target.value);
		setMarkdownContent(html);
	};

	const changeIntroduce = (e) => {
		setIntroducemd(e.target.value);
		let html = marked(e.target.value);
		setIntroducehtml(html);
	};
	const { Option } = Select;
	const { TextArea } = Input;
	const preSave = () => {
		doSave("P");
	};
	const realSave = () => {
		doSave("R");
	};
	const doSave = (flag) => {
		if (!selectedType) {
			message.error("必须选择文章类别");
			return false;
		} else if (!articleTitle) {
			message.error("文章名称不能为空");
			return false;
		} else if (!articleContent) {
			message.error("文章内容不能为空");
			return false;
		} else if (!introducemd) {
			message.error("简介不能为空");
			return false;
		} else if (!showDate) {
			message.error("发布日期不能为空");
			return false;
		}
		let article = {
			typeId: selectedType,
			title: articleTitle,
			articleContent,
			introduce: introducemd,
			addTime: showDate,
		};
		const { id, userName } = userInfo;

		if (articleId === 0) {
			saveArticle(id, userName, flag, article).then((resp) => {
				if (resp.code === 401) {
					props.history.push("/login");
					return;
				}
				if (resp.code === 200) {
					setArticleId(resp.article_id);
					message.error("发布成功");
				} else {
					message.error("发布失败");
				}
			});
		} else {
			let updateTime = moment.unix();
			setUpdateDate(updateTime);
			article.id = articleId;
			article.updateTime = updateTime;
			updateArticle(id, userName, flag, article).then((resp) => {
				if (resp.code === 401) {
					props.history.push("/login");
					return;
				}
				if (resp.code === 200) {
					setArticleId(resp.article_id);
					message.error("保存成功");
				} else {
					message.error("保存失败");
				}
			});
		}
	};

	useEffect(() => {
		let id = localStorage.getItem("id");
		let userName = localStorage.getItem("userName");
		setUserInfo({ id, userName });
		listArticleType(id, userName).then((resp) => {
			if (resp.code === 401) {
				props.history.push("/login");
				return;
			}
			setTypeInfo(resp.article_types);
		});

		let tmpId = props.match.params.id;
		console.log(props);
		if (tmpId) {
			setArticleId(tmpId);
			getArticle(tmpId).then((resp) => {
				console.log(resp);
				let article = resp.detailed_article;
                if (article) {
                    setArticleTitle(article.title);
                    setArticleContent(article.articleContent);
                    let html = marked(article.articleContent);
                    setMarkdownContent(html);
                    setIntroducemd(article.introduce);
                    let htmlIntroduce = marked(article.introduce);
                    setIntroducehtml(htmlIntroduce);
                    setShowDate(article.addTime);
                    setSelectType(article.typeId);
                }
			});
		}
	}, []);

	return (
		<AddArticleWrapper>
			<Row gutter={5}>
				<Col span={18}>
					<Row gutter={10}>
						<Col span={20}>
							<Input
								placeholder="标题"
								size="large"
								value={articleTitle}
								onChange={(e) => {
									setArticleTitle(e.target.value);
								}}
							/>
						</Col>
						<Col span={4}>
							<Select
								defaultValue={selectedType}
								value={selectedType}
								size="large"
								onChange={(value) => {
									setSelectType(value);
								}}
							>
								{typeInfo.map((item, index) => {
									return (
										<Option key={index} value={item.id}>
											{item.typeName}
										</Option>
									);
								})}
							</Select>
						</Col>
					</Row>
					<br />
					<Row gutter={10}>
						<Col span={12}>
							<TextArea
								value={articleContent}
								onChange={changeContent}
								onPressEnter={changeContent}
								className="markdown-content"
								rows={35}
								placeholder="文章内容"
								style={{ resize: "none" }}
							/>
						</Col>
						<Col span={12}>
							<div
								className="show-html"
								dangerouslySetInnerHTML={{
									__html: markdownContent,
								}}
							></div>
						</Col>
					</Row>
				</Col>

				<Col span={6}>
					<Row>
						<Col span={24}>
							<Button size="large" onClick={() => preSave()}>
								暂存文章
							</Button>
							<Button
								type="primary"
								size="large"
								onClick={() => realSave()}
							>
								发布文章
							</Button>
							<br />
						</Col>
						<Col span={24}>
							<br />
							<TextArea
								value={introducemd}
								onChange={changeIntroduce}
								onPressEnter={changeIntroduce}
								rows={4}
								placeholder="文章简介"
								style={{ resize: "none" }}
							/>
							<br />
							<br />
							<div
								className="introduce-html"
								dangerouslySetInnerHTML={{
									__html: "文章简介：" + introducehtml,
								}}
							></div>
						</Col>
						<Col span={12}>
							<div className="date-select">
								<DatePicker
									placeholder="发布日期"
									size="large"
									value={moment.unix(showDate)}
									onChange={(date) => {
										setShowDate(date && date.unix());
									}}
								/>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>
		</AddArticleWrapper>
	);
});
