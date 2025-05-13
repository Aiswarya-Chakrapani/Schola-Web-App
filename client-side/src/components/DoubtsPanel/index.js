import { Component } from "react";
import Navbar from '../Navbar';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

import DoubtCard from '../DoubtCard';

import {
    DoubtsPanelMainPage,
    DoubtsPanelPageBody,
    DoubtsPageSubPart1,
    DoubtsPageSubPart2,
    DoubtsPageFirstHalfParts,
    DoubtsPanelH1,
    DoubtsPanelp,
    DoubtSubmitBtn,
} from './styledComponents.js';

class DoubtsPanel extends Component {
    state = {
        doubtText: '',
        doubtImg: '',
        solutionText: '', // New state variable for solution text
        doubtsArr: [],
        doubtId: '',
    };

    componentDidMount() {
        this.getAllDoubtsApi();
    }

    getAllDoubtsApi = async () => {
        const apiUrl = `http://localhost:3333/doubts`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        this.setState({
            doubtsArr: data,
        });
    };

    uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default'); 

        const response = await fetch(`https://api.cloudinary.com/v1_1/dvqtfuzmp/image/upload`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error('Upload Error:', errorResponse);
            return;
        }

        const result = await response.json();
        console.log(result.url)
        this.setState({
            doubtImg: result.url,
        });
    };

    handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            this.uploadImage(file);
        }
    };

    onChangeDoubt = (event) => {
        this.setState({
            doubtText: event.target.value,
        });
    }

    onChangeSolution = (event) => {
        this.setState({
            solutionText: event.target.value, 
        });
    }

    submitDoubtApiCall = async () => {
        const username = Cookies.get('username');
        const jwtToken = Cookies.get('jwt_token');
        const { doubtText, doubtImg } = this.state;
        const doubt = { doubtText, doubtImg, username, id: uuidv4() };
        const apiUrl = `http://localhost:3333/doubts/add`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(doubt),
        };

        const response = await fetch(apiUrl, options);
       
            console.log('Doubt submitted successfully');

            
            this.setState({
                doubtText: '',
                doubtImg: '',
            });

            
            this.getAllDoubtsApi();
       
    };

    addDoubtToStateFunc = (id) => {
        this.setState({
            doubtId: id,
        });
    }

    solveDoubtApiCall = async () => {
        const { doubtId, solutionText, doubtImg } = this.state; 
        const username = Cookies.get('username');
        const jwtToken = Cookies.get('jwt_token');
        const doubtSolution = { doubtText: solutionText, doubtImg, username, id: doubtId }; 
        const apiUrl = `http://localhost:3333/doubts/admin/solve`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(doubtSolution),
        };

        const response = await fetch(apiUrl, options);
        
            console.log('Doubt solution submitted successfully');
            this.setState({
                solutionText: '', 
            });
            this.getAllDoubtsApi();
        
    }

    render() {
        const { doubtsArr, doubtText, solutionText } = this.state; // Get both state variables

        return (
            <DoubtsPanelMainPage>
                <Navbar selectedMenu='doubts' />
                <DoubtsPanelPageBody>
                    <DoubtsPageSubPart1>
                        <DoubtsPageFirstHalfParts>
                            <DoubtsPanelH1> Ask Your Doubts : </DoubtsPanelH1>
                            <DoubtsPanelp> Submit your doubt : </DoubtsPanelp>
                            <input type="file" accept="image/*" onChange={this.handleFileChange} />
                            <textarea
                                rows={6}
                                value={doubtText}
                                style={{ marginTop: '12px', padding: '15px' }}
                                onChange={this.onChangeDoubt}
                                placeholder="Enter your DOUBT description"
                            />
                            <DoubtSubmitBtn onClick={this.submitDoubtApiCall}> Submit </DoubtSubmitBtn>
                        </DoubtsPageFirstHalfParts>
                        <DoubtsPageFirstHalfParts>
                            <DoubtsPanelH1> Submit Doubt Solution : </DoubtsPanelH1>
                            <DoubtsPanelp> Submit your solution : </DoubtsPanelp>
                            <input type="file" accept="image/*" onChange={this.handleFileChange} />
                            <textarea
                                rows={6}
                                value={solutionText} 
                                style={{ marginTop: '12px', padding: '15px' }}
                                onChange={this.onChangeSolution} 
                                placeholder="Enter your solution"
                            />
                            <DoubtSubmitBtn onClick={this.solveDoubtApiCall}> Submit </DoubtSubmitBtn>
                        </DoubtsPageFirstHalfParts>
                    </DoubtsPageSubPart1>
                    <DoubtsPageSubPart2>
                        <div style={{ height: 'calc(100vh - 120px)', overflow: 'scroll' }}>
                            {doubtsArr.map(each => (
                                <DoubtCard key={each.id} doubt={each} addDoubtToStateFunc={this.addDoubtToStateFunc} />
                            ))}
                        </div>
                    </DoubtsPageSubPart2>
                </DoubtsPanelPageBody>
            </DoubtsPanelMainPage>
        );
    }
}

export default DoubtsPanel;
