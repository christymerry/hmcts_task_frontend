import { Modal, Form, Input, DatePicker, Select } from "antd";
import useTaskModal from "./useTaskModal";

function TaskModal({modalOpen,title,handleCancel,handleOk,selectedTask}) {

    const [form] = Form.useForm();

    const {
        handleSubmit,
        contextHolder
    } = useTaskModal(form, handleOk, selectedTask); 

   
    
  return (
    <>
    {contextHolder}
    <Modal
        title ={title}
        open = {modalOpen}
        onOk={handleSubmit} 
        okText="Save Changes"
        onCancel={() => {
            form.resetFields();
            handleCancel();
        }}
    >
        <Form 
            layout="vertical"
            form={form}
        >
            <Form.Item 
                label="Task Title"
                name= "title"
                rules={[{required:true,message:"Title is Mandatory"}]} 
            >
                <Input placeholder="Please enter task title."/>
            </Form.Item>
            <Form.Item 
                label="Description"
                name= "description"
                rules={[{required:true,message:"Description is Mandatory"}]} 
            >
                <Input.TextArea rows={5} placeholder="Please enter task title."/>
            </Form.Item>
            {selectedTask ? <Form.Item 
                label="Status"
                name= "status"
                rules={[{required:true,message:"Description is Mandatory"}]} 
            >
                <Select placeholder="Select Status">
                    <Select.Option value="New">New</Select.Option>
                    <Select.Option value="InProgress">In-Progress</Select.Option>
                    <Select.Option value="Completed">Completed</Select.Option>
                </Select>
            </Form.Item> : ''}
            <Form.Item
                label="Due date"
                name= "due_date"
                rules={[{required:true,message:"Due date is Mandatory"}]} 
            >
                <DatePicker  />
            </Form.Item>
        </Form> 
    </Modal>
    </>
  )
}

export default TaskModal