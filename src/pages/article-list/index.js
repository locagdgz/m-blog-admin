import React, { memo, useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button, Switch } from "antd";
import { listArticle, delArticleById } from "@/service/article";
import { ArticleListWrapper } from "./style";
import moment from "moment";

export default memo(function ArticleList(props) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setUserInfo({
      id: localStorage.getItem("id"),
      userName: localStorage.getItem("userName"),
    });
    listArticle(1, 10).then((resp) => {
      setList(resp.article_list);
    });
  }, []);

  const handleDelClick = (id) => {
    Modal.confirm({
      title: "确定要删除这篇博客文章吗?",
      content: "如果你点击OK按钮，文章将会永远被删除，无法恢复。",
      onOk() {
        delArticleById(userInfo.id, userInfo.userName, { id });
      },
      onCancel() {
        message.success("没有任何改变");
      },
    });
  };

  const handleUpdateClick = (id, checked) => {
    props.history.push("/admin/edit/" + id);
  };

  const [list, setList] = useState([]);
  return (
    <ArticleListWrapper>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={3}>
              <b>类别</b>
            </Col>
            <Col span={3}>
              <b>发布时间</b>
            </Col>
            <Col span={3}>
              <b>章数</b>
            </Col>
            <Col span={3}>
              <b>浏览量</b>
            </Col>

            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>{item.title}</Col>
              <Col span={3}>{item.typeName}</Col>
              <Col span={3}>
                {moment.unix(item.addTime).format("YYYY-MM-DD HH:mm:ss")}
              </Col>
              <Col span={3}>
                共<span>{item.partCount}</span>章
              </Col>
              <Col span={3}>{item.viewCount}</Col>

              <Col span={4}>
                <Button
                  type="primary"
                  onClick={() => handleUpdateClick(item.id)}
                >
                  编辑
                </Button>
                &nbsp;
                <Button danger onClick={() => handleDelClick(item.id)}>
                  删除{" "}
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </ArticleListWrapper>
  );
});
