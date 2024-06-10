import { Fragment, useEffect } from "react"
import { Button, Flex, Input, Modal, Pagination, Table, Form, Progress } from "antd";
import { LIMIT } from "../../../components/cosnt";
import { changePage, controlBtnLoading, controlModal, getSkills, handleSearchSkill, refetch, setSelected } from "../../../redux/slice/skill";
import request from "../../../server/request";

import "./index.scss"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

const SkillsPage = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state:RootState) => state.auth)
  const {loading ,callback , skills, total, selected, btnLoading, page , isOpen, search } = useAppSelector((state:RootState) => state.skill)
  const [ form ] = Form.useForm();

  const twoColors = {
    '0%': '#108ee9',
    '100%': '#87d068',
  };
  useEffect(() => {
    dispatch(getSkills(user?.role === 'client' ? {user:user._id}  : null))
  } , [ total ,dispatch, page , user ,callback , search])

  const showModal = () => {
    dispatch(controlModal())
    form.resetFields()
  }

  const closeModal = () => {
    dispatch(controlModal())
    dispatch(setSelected(null))
  }

  const submit = async () => {
    try{
      dispatch(controlBtnLoading())
      const values = await form.validateFields();
      const skill = {...values }
      if(selected === null) {
        await request.post('skills' , skill)
      }else{
        await request.put(`skills/${selected}` , skill)
        console.log(selected);
      }
      dispatch(controlModal())
      dispatch(refetch())
    }finally{
      dispatch(controlBtnLoading())
    }
  }

  const editSkill = async (id:string) => {
    try{
      dispatch(controlBtnLoading())
      dispatch(setSelected(id))
      dispatch(controlModal())
      const {data} = await request(`skills/${id}`)
      form.setFieldsValue(data)
    }finally{
      dispatch(controlBtnLoading())
    }
  }

  const deleteSkill = async(id:string) => {
    try{
      dispatch(controlBtnLoading())
      await request.delete(`skills/${id}`)
      dispatch(refetch())
    }finally{
      dispatch(controlBtnLoading())
    }
  }

  const handleSearch =(e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    dispatch(handleSearchSkill(e.target.value))
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Percent',
      dataIndex: 'percent',
      key: 'percent',
      render:(text:number) => {
        return   <Flex vertical gap="middle">
          <p>{text + "%"}</p>
          <Progress percent={text} showInfo={text >= 100 ? true : false } strokeColor={twoColors} />
      </Flex>
      }
    },
    {
      title:'Action' ,
      dataIndex:'_id',
      key:'_id',
      render:(_id:string) => (
        <>
          <Button type="primary" style={{marginRight:'16px'}} onClick={()=> editSkill(_id)} >Edit</Button>
          <Button type="primary"  onClick={()=> deleteSkill(_id)} >Delete</Button>
        </>
      )
    }
  ];  

  return (<Fragment>
    <Input placeholder="Searching skills ..." type="text" onChange={handleSearch} />
    <Table pagination={false} title={() => <Flex justify='space-between' align='center'><h1>Skills {total}</h1> <Button type='dashed' onClick={showModal}> Add </Button></Flex>} loading={loading} columns={columns} dataSource={skills} />
    <Pagination total={total} pageSize={LIMIT} onChange={( page ) => dispatch( changePage( page ) )} />
    <Modal title="Skills data" open={isOpen} onOk={submit} okText={selected === null ?  "Add"  : "Save"} onCancel={closeModal} confirmLoading={btnLoading}>
      <Form
        form={form}
        name="skills"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please fill!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Percent"
          name="percent"
          rules={[
            {
              required: true,
              message: 'Please fill!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  </Fragment >
  )
}

export default SkillsPage