import React, { memo, useState,useEffect } from "react";
import { Layout, Menu, Breadcrumb } from "antd";

import { AdminIndexWrapper } from "./style";
import ArticleList from "../article-list";
import AddArticle from "../add-article";
import WorkView from '../work-view'

import {
	PieChartOutlined,
	DesktopOutlined,
	// UserOutlined,
	FileAddOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import { Route, Switch } from "react-router";

export default memo(function AdminIndex(props) {
	const { Header, Content, Footer, Sider } = Layout;
	const { SubMenu } = Menu;
	const [collapsed, setCollapsed] = useState(true);
    const [selectedKeys, setSelectedKeys] = useState([]);

	const onCollapse = (collapsed) => {
		setCollapsed(collapsed);
	};

	const handleClickArticle = (e) => {
		/* console.log(e.item.props);
    if (e.key === "addArticle") {
      props.history.push("/admin/add");
    } else {
      props.history.push("/admin/list");
    } */
		props.history.push(e.key);
	};

    useEffect(() => {
        let pathname = props.location.pathname
        if (pathname) {
            let index = pathname.indexOf("edit")
            if (index > 0) {
                index = pathname.lastIndexOf("/")
                setSelectedKeys([pathname.substring(0,index)])
            } else {
                setSelectedKeys([pathname])
            }
        }
        
    }, [props.location.pathname])

	return (
		<AdminIndexWrapper>
			<Layout style={{ minHeight: "100vh" }}>
				<Sider
					collapsible={false}
					collapsed={collapsed}
					onCollapse={onCollapse}
				>
					<div className="logo" />
					<Menu
						theme="dark"
						defaultSelectedKeys={["1"]}
						mode="inline"
						selectedKeys={selectedKeys}
					>
						<Menu.Item
							key="/admin/workview"
							onClick={handleClickArticle}
						>
							<PieChartOutlined />
							<span>工作台</span>
						</Menu.Item>
						<Menu.Item
							key="/admin/add"
							onClick={handleClickArticle}
						>
							<FileAddOutlined />
							<span>添加文章</span>
						</Menu.Item>
						<SubMenu
							key="sub1"
							onClick={handleClickArticle}
							title={
								<span>
									<DesktopOutlined />
									<span>文章管理</span>
								</span>
							}
						>
							<Menu.Item key="/admin/edit">编辑文章</Menu.Item>
							<Menu.Item key="/admin/list">文章列表</Menu.Item>
						</SubMenu>

						<Menu.Item key="9">
							<TeamOutlined />
							<span>留言管理</span>
						</Menu.Item>
					</Menu>
				</Sider>

				<Layout>
					<Header style={{ background: "#fff", padding: 0 }} />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb style={{ margin: "16px 0" }}>
							<Breadcrumb.Item>后台管理</Breadcrumb.Item>
							<Breadcrumb.Item>工作台</Breadcrumb.Item>
						</Breadcrumb>
						<div
							style={{
								padding: 24,
								background: "#fff",
								minHeight: 360,
							}}
						>
							<div>
								<Switch>
									<Route
										path="/admin/"
										exact
										component={AddArticle}
									/>
									<Route
										path="/admin/add/"
										exact
										component={AddArticle}
									/>
									<Route
										path="/admin/edit/:id"
										exact
										component={AddArticle}
									/>
									<Route
										path="/admin/list"
										exact
										component={ArticleList}
									/>
									<Route 
                                        path="/admin/workview"
                                        exact
                                        component={WorkView}
                                    />
								</Switch>
							</div>
						</div>
					</Content>
					<Footer style={{ textAlign: "center" }}>
						locknlock.club
					</Footer>
				</Layout>
			</Layout>
		</AdminIndexWrapper>
	);
});
