import MainLayout from "../../components/layouts/mainLayout"
import {Table,Input,Select,Button} from "antd"
import useHomeScreen from "./useHomeScreen"
import TaskModal from "../../components/modals/taskModal/taskModal";

function HomeScreen() {

  const {
      columns,
      dataSource,
      addTask,
      isModalOpen,
      handleCancel,
      handleOk,
      showTaskDetails,
      searchParams,
      setSearchParams,
      filteredData
    } = useHomeScreen();

  return (
    <MainLayout
      title="Home Page"
    >
        <h2 className="font-semibold mb-1.5">All Tasks</h2>
        <div className="flex justify-between">
          <div className=" flex gap-1">
            <Input 
              placeholder="Search By Task Title"
              allowClear
              onChange={(e) => setSearchParams((prev) => ({...prev, subject: e.target.value}))}
            />
            <Select 
              defaultValue="all" 
              style={{ width: 320 }}
              onChange={(val) => setSearchParams((prev) => ({...prev, status: val}))} 
              options ={[
                {value:'all',label:'All Status'},
                {value:'New',label:'New'},
                {value:'InProgress',label:'In Progess'},
                {value:'Completed',label:'Completed'}
              ]}
            />
          </div>
          <Button type="primary" onClick={addTask}>Add New Task</Button>
        </div>
        
        <Table className="mt-3"
          columns={columns} 
          dataSource ={filteredData}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => { 
                showTaskDetails(record.id)
              }
            };
          }}
        />
        <TaskModal 
          modalOpen={isModalOpen} 
          handleCancel={handleCancel} 
          handleOk={handleOk} 
          title="Add New Task"
        />

    </MainLayout>
  )
}

export default HomeScreen