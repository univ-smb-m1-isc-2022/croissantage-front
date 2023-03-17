import React, { Component } from 'react';
import TutorialDataService from '../services/tutorial.service';
import TutorialModel from "../model/tutorial.model";

type State = {
    id: number | null,
    title: string,
    description: string,
    published: boolean,
    submitted: boolean
};

export default class AddTutorial extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveTutorial = this.saveTutorial.bind(this);
        this.newTutorial = this.newTutorial.bind(this);

        this.state = {
            id: null,
            title: '',
            description: '',
            published: false,
            submitted: false
        };
    }

    onChangeTitle(e: React.ChangeEvent<HTMLInputElement>) { this.setState({ title: e.target.value }); }
    onChangeDescription(e: React.ChangeEvent<HTMLInputElement>) { this.setState({ description: e.target.value }); }

    saveTutorial() {
        const data: TutorialModel = new TutorialModel(-1, this.state.title, this.state.description, false);

        TutorialDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    published: response.data.published,
                    submitted: true
                });

                console.table(response.data);
            })
            .catch(e => console.error(e));
    }

    newTutorial() {
        this.setState({
            id: null,
            title: '',
            description: '',
            published: false,
            submitted: false
        });
    }

    render() {
        return (
            <div>
                {this.state.submitted ? (
                    <div>
                        <h4>Submission successful !</h4>
                        <button onClick={this.newTutorial}>Add</button>
                    </div>
                ) : (
                    <div>
                        <div>
                            <label htmlFor='title'>Title</label>
                            <input
                                type='text'
                                id='title'
                                name='title'
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor='description'>Description</label>
                            <input
                                type='text'
                                id='description'
                                name='description'
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                required
                            />
                        </div>

                        <button onClick={this.saveTutorial}>Submit</button>
                    </div>
                )}
            </div>
        );
    }
}