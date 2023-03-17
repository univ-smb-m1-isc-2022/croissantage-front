import React, {ChangeEvent, Component} from 'react';
import TutorialModel from '../model/tutorial.model';
import TutorialDataService from '../services/tutorial.service';

type State = {
    currentTutorial: TutorialModel,
    message: string
}

export default class Tutorial extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getTutorial = this.getTutorial.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateTutorial = this.updateTutorial.bind(this);
        this.deleteTutorial = this.deleteTutorial.bind(this);

        this.state = {
            currentTutorial: new TutorialModel(-1, '', '', false),
            message: ''
        };
    }

    componentDidMount() { this.getTutorial(this.props.match.params.id); }

    onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        this.setState(prevState => {
            const tutorial = prevState.currentTutorial;
            tutorial.title = e.target.value;
            return {currentTutorial: tutorial};
        })
    }

    onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
        this.setState(function (prevState) {
            const tutorial = prevState.currentTutorial;
            tutorial.description = e.target.value;
            return {currentTutorial: tutorial};
        })
    }

    getTutorial(id: number) {
        TutorialDataService.get(id)
            .then(response => {
                this.setState({currentTutorial: response.data});
                console.table(response.data);
            })
            .catch(e => console.error(e));
    }

    updatePublished(status: boolean) {
        const data = this.state.currentTutorial;
        data.published = status;

        TutorialDataService.update(data.id, data)
            .then(response => {
                this.setState(prevState => {
                    const tutorial = prevState.currentTutorial;
                    tutorial.published = status;
                });

                console.log(response.data);
            })
            .catch(e => console.error(e));
    }

    updateTutorial() {
        TutorialDataService.update(
            this.state.currentTutorial.id,
            this.state.currentTutorial
        )
            .then(response => {
                console.log(response.data);
                this.setState({message: 'The tutorial was updated successfully'});
            })
            .catch(e => console.error(e));
    }

    deleteTutorial() {
        TutorialDataService.delete(this.state.currentTutorial.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/tutorials');
            })
            .catch(e => console.error(e));
    }

    render() {
        const {currentTutorial} = this.state;

        return (
            <div>
                {currentTutorial ? (
                    <div>
                        <h4>Tutorial</h4>

                        <form>
                            <div>
                                <label htmlFor='title'>Title</label>
                                <input
                                    type='text'
                                    id='title'
                                    value={currentTutorial.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>

                            <div>
                                <label htmlFor='description'>Description</label>
                                <input
                                    type='text'
                                    id='description'
                                    value={currentTutorial.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>

                            <div>
                                <label>
                                    <strong>Status :</strong>
                                </label>
                                {currentTutorial.published ? "Published" : "Pending"}
                            </div>
                        </form>

                        {currentTutorial.published ? (
                            <button onClick={() => this.updatePublished(false)}>
                                Unpublish
                            </button>
                        ) : (
                            <button onClick={() => this.updatePublished(true)}>
                                Publish
                            </button>
                        )}

                        <button onClick={this.deleteTutorial}>
                            Delete
                        </button>

                        <button
                            type='submit'
                            onClick={this.updateTutorial}
                        >
                            Update
                        </button>

                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a tutorial...</p>
                    </div>
                )}
            </div>
        );
    }
}