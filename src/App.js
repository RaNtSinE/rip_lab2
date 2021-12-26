import React, {Component} from 'react';
import './App.css';
import Main from "./task/main/Main";
import TaskWindow from "./task/taskWindow/TaskWindow";
import EditWindow from "./task/editWindow/EditWindow";
import consts from "./Consts";

class App extends Component {

    constructor(props) {
        super(props);
        this.idCounter = 3;

        this.tasks = [
            {id: 1, name: "FIRST_TASK", text: "FIRST_TEXT", isComplete: false},
            {id: 2, name: "SECOND_TASK", text: "SECOND_TEXT", isComplete: true}
        ];

        this.state = {
            window: '',
            tasks: [
                {id: 1, name: "FIRST_TASK", text: "FIRST_TEXT", isComplete: false},
                {id: 2, name: "SECOND_TASK", text: "SECOND_TEXT", isComplete: true}],
            currentTask: -1,
            editMode: ""
        };

        this.createTask = this.createTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.getTaskIndexById = this.getTaskIndexById.bind(this);
        this.getTask = this.getTask.bind(this);
        this.changeWindow = this.changeWindow.bind(this);
        this.selectTask = this.selectTask.bind(this);
        this.changeEditMode = this.changeEditMode.bind(this);
        this.updateIsComplete = this.updateIsComplete.bind(this);
    }


    changeWindow(window) {
        this.setState({window: window});
    }

    changeEditMode(mode) {
        console.log(mode);
        this.setState({editMode: mode});
    }

    createTask(task) {
        task.id = this.idCounter;
        this.idCounter++;

        this.tasks.push(task);

        this.setState({tasks: this.tasks});
    }

    getTask(id) {
        let taskIndex = this.getTaskIndexById(id);
        return this.tasks[taskIndex];
    }

    updateTask(task) {
        console.log(task);
        let taskIndex = this.getTaskIndexById(task.id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = task;

            this.setState({tasks: this.tasks});
        }
    }

    deleteTask(id) {
        let taskIndex = this.getTaskIndexById(id);
        this.tasks.splice(taskIndex, 1);

        this.setState({tasks: this.tasks});
    }

    selectTask(id) {
        this.setState({currentTask: id})
    }

    updateIsComplete(id, checked) {
        let taskIndex = this.getTaskIndexById(id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex].isComplete = checked;

            this.setState({tasks: this.tasks});
        }
    }

    getTaskIndexById(id) {
        return this.tasks.findIndex(currentTask => currentTask.id === id);
    }

    render() {
        let window;

        switch (this.state.window) {
            case consts.EDIT_WINDOW:
                window = <EditWindow
                    createTask={this.createTask}
                    updateTask={this.updateTask}
                    selectTask={this.selectTask}
                    currentStateTask={this.state.currentTask}
                    changeWindow={this.changeWindow}
                    changeEditMode={this.changeEditMode}
                    currentTask={this.state.tasks[this.getTaskIndexById(this.state.currentTask)]}
                    editMode={this.state.editMode}
                />;
                break;
            case consts.TASK_WINDOW:
                window = <TaskWindow deleteTask={this.deleteTask}
                                     changeWindow={this.changeWindow}
                                     changeEditMode={this.changeEditMode}
                                     selectTask={this.selectTask}
                                     currentTask={this.state.tasks[this.getTaskIndexById(this.state.currentTask)]}
                />;
                break;
            default:
                window = '';
                break;
        }

        return (
            <div className="App">
                <Main
                    tasks={this.state.tasks}
                    changeWindow={this.changeWindow}
                    changeEditMode={this.changeEditMode}
                    selectTask={this.selectTask}
                    updateIsComplete={this.updateIsComplete}
                />
                {window}
            </div>
        );
    }
}

export default App;
