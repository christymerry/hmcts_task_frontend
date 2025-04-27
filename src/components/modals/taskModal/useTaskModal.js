import { message } from "antd";
import axiosInstance from "../../../axios";
import dayjs from "dayjs";

const useTaskModal = (form, handleOk, selectedTask) => {

    const [messageApi, contextHolder] = message.useMessage();

    if(selectedTask) {
        form.setFieldsValue({
            title : selectedTask.title,
            description : selectedTask.description,
            status : selectedTask.status,
            due_date : dayjs(selectedTask.due_date)
        })
    }

    const handleSubmit = async () => {

        try {
            const values = await form.validateFields();

            const data = {
                ...values,
                due_date : values.due_date.format('YYYY-MM-DD HH:mm:ss'),
            }
            

            if(selectedTask) {
                await axiosInstance.post(`/${selectedTask.id}`, data);
            } else {
                await axiosInstance.post('/', data);
            }

            

            messageApi.success("Submitted");

            handleOk();

            form.resetFields();

        } catch(err) {
            messageApi.error('Something Went Wrong');
        }
       

    }


    return {
        handleSubmit,
        contextHolder
    }
}

export default useTaskModal