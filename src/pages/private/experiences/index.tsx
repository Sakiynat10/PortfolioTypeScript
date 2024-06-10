import { Button, Input, Modal, Pagination, Table , Form, Flex, TableProps } from "antd";
import { Fragment, useEffect } from "react";
import { LIMIT } from "../../../components/cosnt";
import { getExperiences , controlModal , controlBtnLoading,refetch, handleSearchExperience } from "../../../redux/slice/experience";
import { changePage, setSelected } from "../../../redux/slice/experience";
import request from "../../../server/request";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ExperienceType from "../../../types/experience";
import { RootState } from "../../../redux/store";


const ExperiencePage = () => {
  const dispatch = useAppDispatch()
  const {user} = useAppSelector((state:RootState) => state.auth)
  const {loading , callback , experiences , total , selected , btnLoading ,page , search , isOpen} = useAppSelector((state:RootState) => state.experience);
  const [form] = Form.useForm()


  useEffect(() => {
    console.log(user);
    dispatch(getExperiences(user?.role === 'client' ? {user:user._id} : null))
  } , [dispatch , user ,page, callback , search])

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
      const experience = {...values }
      if(selected === null) {
        await request.post('experiences' , experience)
      }else{
        await request.put(`experiences/${selected}` , experience)
        console.log(selected);
      }
      dispatch(controlModal())
      dispatch(refetch())
    }finally{
      dispatch(controlBtnLoading())
    }
  }


  const editExperience = async(id:string) => {
    try{
      dispatch(controlBtnLoading())
      dispatch(setSelected(id))
      dispatch(controlModal())
      const {data} = await request(`experiences/${id}`)
      form.setFieldsValue(data)
    }finally{
      dispatch(controlBtnLoading())
    }
  }

  const deleteExperience = async(id:string) => {
    try{
      dispatch(controlBtnLoading())
      await request.delete(`experiences/${id}`)
      dispatch(refetch())
    }finally{
      dispatch(controlBtnLoading())
    }
  }

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>)  => {
    console.log(e.target.value);
    dispatch(handleSearchExperience(e.target.value))
  }


  const columns: TableProps<ExperienceType>['columns'] = [
    {
      title:'Job Name',
      dataIndex:"workName",
      key:"workName"
    },
    {
      title:'Company',
      dataIndex:"companyName",
      key:"companyName"
    },
    {
      title:'Description',
      dataIndex:"description",
      key:"description"
    },
    {
      title:'Start Date',
      dataIndex:"startDate",
      key:"startDate",
      render: (text:string) => {
         return text.split("T")[0]
      }
    },
    {
      title:'End Date',
      dataIndex:"endDate",
      key:"endData",
      render: (text:string) => {
        console.log(text.split("T")[0]);
        return text.split("T")[0]
     }
    },
    {
      title:'Action' ,
      dataIndex:'_id',
      key:'_id',
      render:(_id:string) => (
        <>
          <Button type="primary" style={{marginRight:'16px'}} onClick={()=> editExperience(_id)} >Edit</Button>
          <Button type="primary"  onClick={()=> deleteExperience(_id)} >Delete</Button>
        </>
      )
    }
  ]
  return (<Fragment>
    <Input placeholder="Searching experiences ..." type="text" onChange={handleSearch} />
    <Table pagination={false} title={() => <Flex justify='space-between' align='center'><h1>Experiences {total}</h1> <Button type='dashed' onClick={showModal}> Add </Button></Flex>} loading={loading} columns={columns} dataSource={experiences} />
    <Pagination total={total} showSizeChanger={false} pageSize={LIMIT}  onChange={( page ) => dispatch( changePage( page ) )}/>
    <Modal title="Experiences data" open={isOpen} onOk={submit} okText={selected === null ?  "Add"  : "Save"} onCancel={closeModal} confirmLoading={btnLoading}>
      <Form
        form={form}
        name="experiences"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Work Name"
          name="workName"
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
          label="Company"
          name="companyName"
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
          label="Description"
          name="description"
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
          label="Start Date"
          name="startDate"
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
          label="End Date"
          name="endDate"
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

export default ExperiencePage