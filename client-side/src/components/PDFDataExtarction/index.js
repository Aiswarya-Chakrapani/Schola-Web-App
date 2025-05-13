import { Component } from "react"
import Navbar from '../Navbar'
import { FaRegFilePdf } from "react-icons/fa6"
import { ImCross } from "react-icons/im"
import QuestionAnswerBlock from "../QuestionAndAnswerBlock/index.js"
import { ThreeCircles } from 'react-loader-spinner'

import {
    PDFMainPage,
    PDFPageBody,
    PDFSelectionBlock,
    PDFMoveBlock,
    PDFHeading,
    PDFInput,
    PDFInputBlock,
    PDFSubHeading,
    PDFSubmitBtn,
    PDFOutputBlock,
    AnswerListItem,
} from './styledComponents.js'

import './index.css'

class PDFDataExtraction extends Component {
    state = {
        mainpoints: [],
        pdfMethodQuestions: false,
        pdfOutput: false,
        pdfQuestionAndAnswersArr: [],
        isLoading: false, // New loading state
    }

    crossPDFOutputBtn = () => {
        this.setState({
            pdfOutput: false,
            mainpoints: [],
            pdfQuestionAndAnswersArr: [],
            isLoading: false, // Reset loading state
        })
    }

    onClickSubmit = async () => {
        const { pdfMethodQuestions } = this.state
        const formData = new FormData();
        const fileInput = document.querySelector('#fileInput');

        if (fileInput.files.length === 0) {
            alert('Please select a file.');
            return;
        }

        formData.append('pdfFile', fileInput.files[0]);
        this.setState({ isLoading: true }); // Set loading state to true

        try {
            const apiUrl = pdfMethodQuestions
                ? 'http://localhost:3333/upload/questions'
                : 'http://localhost:3333/upload/mainpoints';
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            if (pdfMethodQuestions) {
                this.setState({
                    pdfQuestionAndAnswersArr: result.questionsAndAnswers,
                    pdfOutput: true,
                });
            } else {
                this.setState({
                    mainpoints: result.questionsAndAnswers,
                    pdfOutput: true,
                });
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            document.querySelector('#results').innerText = 'An error occurred while processing your file.';
        } finally {
            this.setState({ isLoading: false }); // Hide loader after processing
        }
    }

    clickPDFChangeBtn = () => {
        this.setState(prevState => ({
            pdfMethodQuestions: !prevState.pdfMethodQuestions,
        }))
    }

    render() {
        const { pdfMethodQuestions, pdfOutput, pdfQuestionAndAnswersArr, mainpoints, isLoading } = this.state

        return (
            <PDFMainPage>
                <Navbar selectedMenu='pdf' />
                <PDFPageBody>
                    <PDFSelectionBlock onClick={this.clickPDFChangeBtn} method={pdfMethodQuestions}>
                        <PDFMoveBlock onClick={this.clickPDFChangeBtn} method={pdfMethodQuestions}>
                            <FaRegFilePdf style={{color: 'white', fontSize: '30px', marginRight: '-10px'}} />
                        </PDFMoveBlock>
                    </PDFSelectionBlock>

                    <PDFHeading>{pdfMethodQuestions ? 'PDF AUTOMATED QUESTIONS' : 'PDF DATA EXTRACTION'}</PDFHeading>
                    <div style={{ display: 'flex', marginTop: '20px' }}>
                        <div>
                            <PDFSubHeading>Submit your PDF:</PDFSubHeading>
                            <PDFInputBlock>
                                <PDFInput type="file" id="fileInput" accept="application/pdf" />
                            </PDFInputBlock>
                            <PDFSubmitBtn onClick={this.onClickSubmit}>Submit</PDFSubmitBtn>
                        </div>
                    </div>

                    {/* Display loader when processing */}
                    {isLoading && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh'
                        }}>
                            <ThreeCircles
                                height="100"
                                width="100"
                                color="black"
                                wrapperStyle={{}}
                                visible={true}
                                ariaLabel="three-circles-rotating"
                            />
                        </div>
                    )}
                </PDFPageBody>

                {pdfOutput && !isLoading && (
                    <PDFOutputBlock>
                        <ImCross style={{ alignSelf: 'flex-end', cursor: 'pointer' }} onClick={this.crossPDFOutputBtn} />
                        {!pdfMethodQuestions ? (
                            mainpoints.map((each, index) => (
                                <AnswerListItem key={index}>{each}</AnswerListItem>
                            ))
                        ) : (
                            <ol>
                                {pdfQuestionAndAnswersArr.map((each, index) => (
                                    <QuestionAnswerBlock key={index} qanda={each} />
                                ))}
                            </ol>
                        )}
                    </PDFOutputBlock>
                )}
            </PDFMainPage>
        )
    }
}

export default PDFDataExtraction
