import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSkills } from "../../../redux/slice/skill";
import CountUp from "react-countup";

import { Statistic } from "antd";
import {
  FileTextOutlined,
  FileSyncOutlined,
  CheckCircleTwoTone,
  ScheduleOutlined,
} from "@ant-design/icons";

import "./index.scss";
import { getExperiences } from "../../../redux/slice/experience";
import { useGetEducationsQuery } from "../../../redux/query/education";
import EducationType from "../../../types/education";
import { useAppSelector } from "../../../redux/hooks";
import PaginationType from "../../../types/pagination";

const DashboardPage = () => {
  const { data } = useGetEducationsQuery() as { data: {data:EducationType[]; pagination:PaginationType}, isFetching:boolean; refetch:() => void};
  const educationTotal = data?.pagination?.total;

  const formatter = (value:number) => <CountUp end={value} separator="," />;

  const { total: t1 } = useAppSelector((state) => state.skill);

  const { total: t2 } = useAppSelector((state) => state.experience);

  const dispatch = useDispatch();

  useEffect(() => {
    t1 || dispatch(getSkills());
    t2 || dispatch(getExperiences());
  }, [dispatch, t1, t2]);

  useEffect(() => {
    t2 || dispatch(getExperiences());
  }, [dispatch, t1, t2]);
  return (
    <Fragment>
      <div className="dashboard">
        <div className="infos">
          <div className="info-tables">
            <div className="card-salary">
              <span className="money-card">
                <FileSyncOutlined color="white" />
              </span>
              <span className="salary-title" style={{ fontSize: "32px" }}>
                All skills
              </span>
              <Statistic
                className="statistics"
                style={{
                  marginTop: "70px",
                  paddingTop: "30px",
                  display: "flex",
                }}
                value={t1}
                formatter={formatter}
                title={<CheckCircleTwoTone style={{ color: "red" }} />}
              />
            </div>
          </div>
          <div className="info-tables">
            <div className="card-salary">
              <span className="money-card-fee">
                <FileTextOutlined  color="white" />
              </span>
              <span className="salary-title" style={{ fontSize: "32px" }}>
                All experiences
              </span>
              <Statistic
                className="statistics"
                style={{
                  marginTop: "70px",
                  paddingTop: "30px",
                  display: "flex",
                }}
                value={t2}
                formatter={formatter}
                title={<CheckCircleTwoTone />}
              />
            </div>
          </div>
          <div className="info-tables">
            <div className="card-salary">
              <span
                className="money-card-fee"
                style={{ backgroundColor: "yellow" }}
              >
                <ScheduleOutlined  color="white" />
              </span>
              <span className="salary-title" style={{ fontSize: "32px" }}>
                All Education
              </span>
              <Statistic
                className="statistics"
                style={{
                  marginTop: "70px",
                  paddingTop: "30px",
                  display: "flex",
                }}
                value={educationTotal}
                formatter={formatter}
                title={<CheckCircleTwoTone />}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardPage;
