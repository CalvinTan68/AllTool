import { SearchOutlined } from "@ant-design/icons";
import { Card, Col, Empty, Input, Row, Typography } from "antd";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { pages } from "../../data/pages";

function Home() {
  const [search, setSearch] = useState("");

  const filteredPages = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) return pages;

    return pages.filter((item) =>
      item.label.toLowerCase().includes(normalizedSearch)
    );
  }, [search]);

  return (
    <>
      <div className="home">
        <Typography.Title level={2} style={{ textAlign: "center" }}>
          AllTool - All in One Web/App Tools You Need
        </Typography.Title>
        <Input
          allowClear
          className="home-search"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search tools"
          prefix={<SearchOutlined />}
          size="large"
          value={search}
        />
        {filteredPages.length ? (
          <Row gutter={[16, 16]}>
            {filteredPages.map((item) => {
              return (
                <Col xs={12} sm={8} md={6} key={item.link}>
                  <Link to={item.link}>
                    <Card
                      hoverable={true}
                      style={{ backgroundColor: "transparent" }}
                    >
                      <Typography.Title level={2}>
                        {item.image}
                      </Typography.Title>
                      <Typography.Title level={5}>
                        {item.label}
                      </Typography.Title>
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </Row>
        ) : (
          <Empty description="No tools found" />
        )}
      </div>
    </>
  );
}

export default Home;
