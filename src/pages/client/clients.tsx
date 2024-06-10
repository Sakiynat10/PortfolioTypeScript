import { Fragment, useEffect, useState } from "react";
import request from "../../server/request";
import { LIMIT } from "../../components/cosnt";
import ClientCard from "../../components/cards/client-card/client";
import { Pagination } from "antd";
import Loading from "../../components/loading";
import UserType from "../../types/user";

const ClientsPage = () => {
  const [data, setData] = useState<UserType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const getStudent = async () => {
      try {
        setLoading(true);
        const params = { page, limit: LIMIT };
        const {
          data: { data, pagination },
        } = await request(`users?role=client`, { params });
        setTotal(pagination?.total);
        setData(data);
      } finally {
        setLoading(false);
      }
    };
    getStudent();
  }, [page]);

  const getPage = (page:number) => {
    setPage(page);
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="client-content container" style={{ paddingTop: 120 }}>
            {data?.map((client:UserType, i:number) => (
              <ClientCard key={i} {...client} />
            ))}
          </div>
          <Pagination
            total={total}
            showSizeChanger={false}
            pageSize={LIMIT}
            onChange={getPage}
          />
        </>
      )}
    </Fragment>
  );
};

export default ClientsPage;
