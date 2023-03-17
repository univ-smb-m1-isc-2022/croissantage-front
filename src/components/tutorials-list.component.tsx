import React, {Component} from 'react';
import TutorialModel from "../model/tutorial.model";
import TutorialDataService from '../services/tutorial.service';
import {Link} from 'react-router-dom';

type State = {
    tutorials: TutorialModel[],
    currentTutorial: TutorialModel | null,
    currentIndex: number,
    searchTitle: string
};

export default class TutorialsList extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: ''
        };
    }

    componentDidMount() { this.retrieveTutorials(); }

    onChangeSearchTitle(e: React.ChangeEvent<HTMLInputElement>) { this.setState({searchTitle: e.target.value}); }

    retrieveTutorials() {
        TutorialDataService.getAll()
            .then(response => {
                this.setState({tutorials: response.data});
                console.table(response.data);
            })
            .catch(e => console.error(e));
    }

    refreshList() {
        this.retrieveTutorials();
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });
    }

    setActiveTutorial(tutorial: TutorialModel, index: number) {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index
        });
    }

    removeAllTutorials() {
        TutorialDataService.deleteAll()
            .then(response => {
                console.table(response.data);
                this.refreshList();
            })
            .catch(e => console.error(e));
    }

    searchTitle() {
        TutorialDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({tutorials: response.data});
                console.table(response.data);
            })
            .catch(e => console.error(e));
    }

    render() {
        const {searchTitle, tutorials, currentTutorial, currentIndex} = this.state;

        return (
            <div>
                <div>
                    <div>
                        <input
                            type='text'
                            placeholder='Search by title'
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div>
                            <button
                                type='button'
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    <div>
                        <h4>Tutorials List</h4>

                        <ul>
                            {tutorials &&
                                tutorials.map((tutorial, index) => (
                                    <li
                                        className={index === currentIndex ? 'active' : ''}
                                        onClick={() => this.setActiveTutorial(tutorial, index)}
                                        key={index}
                                    >
                                        {tutorial.title}
                                    </li>
                                ))}
                        </ul>

                        <button onClick={this.removeAllTutorials}>Remove All</button>
                    </div>

                    <div>
                        {currentTutorial ? (
                            <div>
                                <h4>Tutorial</h4>

                                <div>
                                    <label>
                                        <strong>Title :</strong>
                                    </label>{" "}
                                    {currentTutorial.title}
                                </div>

                                <div>
                                    <label>
                                        <strong>Description :</strong>
                                    </label>{" "}
                                    {currentTutorial.description}
                                </div>

                                <div>
                                    <label>
                                        <strong>Status :</strong>
                                    </label>{" "}
                                    {currentTutorial.published ? "Published" : "Pending"}
                                </div>

                                <Link to={`/tutorials/${currentTutorial.id}`}>Edit</Link>
                            </div>
                        ) : (
                            <div>
                                <br />
                                <p>Please click on a Tutorial...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}