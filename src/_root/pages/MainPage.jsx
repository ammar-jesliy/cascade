import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCreateStatusMutation } from "../../lib/react-query/queriesAndMutations";
import Modal from "../../components/Modal";
import {
  fetchStatuses,
  fetchTasks,
  fetchSubtasks,
  setComplete,
} from "../../lib/appwrite/api";
import Spinner from "../../components/Spinner";
import "../../assets/scrollbar.css";
import Delete from "../../assets/Delete.svg";
import Subtasks from "./Subtasks";

const MainPage = () => {
  const { groupId } = useParams();

  const { mutateAsync: createStatus } = useCreateStatusMutation();
  const [statuses, setStatuses] = useState(() => {
    const savedStatuses = localStorage.getItem("statuses");
    return savedStatuses ? JSON.parse(savedStatuses) : [];
  });
  const [statusTitle, setStatusTitle] = useState("");
  const [statusColor, setStatusColor] = useState("#000000");
  const [isLoading, setIsLoading] = useState(false);

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [subtasks, setSubtasks] = useState(() => {
    const savedSubtasks = localStorage.getItem("subtasks");
    return savedSubtasks ? JSON.parse(savedSubtasks) : [];
  });

  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [isTaskModalVisible, setTaskModalVisible] = useState(false);

  const [currentTask, setCurrentTask] = useState();

  const openStatusModal = () => {
    setStatusModalVisible(true);
  };

  const closeStatusModal = () => {
    setStatusModalVisible(false);
    setStatusTitle("");
    setStatusColor("#000000");
  };

  const openTaskModal = (taskId) => {
    setTaskModalVisible(true);
    setCurrentTask(taskId);
  };

  const closeTaskModal = () => {
    setTaskModalVisible(false);
  };

  const handleCreateStatus = async () => {
    if (statusTitle.trim() !== "") {
      const title = statusTitle;
      const color = statusColor;

      try {
        const newStatus = await createStatus({ title, color, groupId });

        if (!newStatus) throw Error;

        setStatuses((prevStatuses) => [...prevStatuses, newStatus]);
      } catch (error) {
        console.log(error);
      }

      setStatusTitle("");
      setStatusColor("#000000");
    }
  };

  const updateSubtaskStatus = async (subtaskId, newCompleted) => {
    try {
      await setComplete(subtaskId, newCompleted);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const fetchedStatuses = await fetchStatuses(groupId);

        if (!fetchedStatuses) throw Error;

        const fetchedTasksPromises = fetchedStatuses.map((status) =>
          fetchTasks(status.$id)
        );
        const fetchedTasksArray = await Promise.all(fetchedTasksPromises);
        const fetchedTasks = fetchedTasksArray.flat();

        if (!fetchedTasks) throw Error;

        const fetchedSubtasksPromises = fetchedTasks.map((task) =>
          fetchSubtasks(task.$id)
        );
        const fetchedSubtasksArray = await Promise.all(fetchedSubtasksPromises);
        const fetchedSubtasks = fetchedSubtasksArray.flat();

        if (!fetchedSubtasks) throw Error;

        setStatuses(fetchedStatuses);
        setTasks(fetchedTasks);
        setSubtasks(fetchedSubtasks);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (groupId) {
      loadData();
    }
  }, [groupId]);

  useEffect(() => {
    localStorage.setItem("statuses", JSON.stringify(statuses));
  }, [statuses]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("subtasks", JSON.stringify(subtasks));
  }, [subtasks]);

  return (
    <>
      <Modal isVisible={isTaskModalVisible} onClose={closeTaskModal}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-primary capitalize">
              {tasks.find((task) => task.$id === currentTask) &&
                tasks.find((task) => task.$id === currentTask).title}
            </h3>
            <button>
              <img src={Delete} alt="Delete" />
            </button>
          </div>
          <p className="text-sm font-normal text-grey2">
            {tasks.find((task) => task.$id === currentTask) &&
              tasks.find((task) => task.$id === currentTask).description}
          </p>
          <div>
            <h4 className="font-semibold text-base text-primary">Subtasks</h4>
            {subtasks
              .filter((subtask) => subtask.tasks.$id === currentTask)
              .map((subtask) => {
                return (
                  <Subtasks
                    key={subtask.$id}
                    subtask={subtask}
                    updateSubtaskStatus={updateSubtaskStatus}
                  />
                );
              })}
          </div>
        </div>
      </Modal>
      <Modal isVisible={isStatusModalVisible} onClose={closeStatusModal}>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2 justify-between w-full items-center">
            <input
              type="text"
              value={statusTitle}
              onChange={(e) => setStatusTitle(e.target.value)}
              placeholder="Status Title"
              className="w-full h-40px px-3 py-2 text-black rounded-lg border-grey1 border-2"
            />

            <label htmlFor="color">Color</label>
            <input
              type="color"
              id="color"
              className="border-none h-11 overflow-hidden appearance-none"
              value={statusColor}
              onChange={(e) => setStatusColor(e.target.value)}
            />
          </div>

          <button
            onClick={handleCreateStatus}
            className="bg-accent1 px-6 py-2 text-white font-semibold rounded-xl"
          >
            Create
          </button>
        </div>
      </Modal>

      <div className="bg-bgApp flex-1 h-[calc(100vh-100px)] lg:w-[calc(100vw-320px)] w-screen overflow-auto mt-[100px] pl-8 pb-8 lg:ml-[320px]">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="z-10 flex">
            <ul className="flex gap-10 mr-10">
              {statuses &&
                statuses
                  .filter((status) => status.groups.$id === groupId)
                  .map((status) => {
                    return (
                      <li key={status.$id} className="w-[300px] flex flex-col">
                        <div className="flex gap-4 items-center sticky top-0 justify-center bg-bgApp py-8 ">
                          <div
                            className="h-6 w-6 rounded-full"
                            style={{ backgroundColor: status.color }}
                          ></div>
                          <p className="text-lg font-normal uppercase text-grey2">
                            {status.title}
                          </p>
                        </div>
                        {tasks &&
                          tasks
                            .filter((task) => task.statuses.$id === status.$id)
                            .map((task) => {
                              return (
                                <div key={task.$id}>
                                  <button
                                    className="bg-bg rounded-xl py-6 px-6 flex flex-col gap-4 cursor-pointer w-full mb-4"
                                    onClick={() => openTaskModal(task.$id)}
                                  >
                                    <p className="text-lg font-semibold text-primary text-left">
                                      {task.title}
                                    </p>
                                    <p className="text-sm font-medium text-grey2">
                                      0 of{" "}
                                      {
                                        subtasks.filter(
                                          (subtask) =>
                                            subtask.tasks.$id === task.$id
                                        ).length
                                      }{" "}
                                      subtasks
                                    </p>
                                  </button>
                                </div>
                              );
                            })}
                      </li>
                    );
                  })}
            </ul>

            <button
              className="bg-accent2 w-[300px] h-[calc(100vh-224px)] px-10 rounded-2xl text-primary text-[22px] font-bold whitespace-nowrap mr-10 mt-[92px]"
              onClick={() => openStatusModal()}
            >
              + New Status
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MainPage;
