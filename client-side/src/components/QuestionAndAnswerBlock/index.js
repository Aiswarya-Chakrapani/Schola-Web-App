import {
    PDFQuetionAnsListItem
} from './styledComponents.js'

const QuestionAnswerBlock = props => {
    const {qanda} = props
    const {question, answer} = qanda
    return (
        <PDFQuetionAnsListItem>
            <p>{question}</p>
            <details>
                <summary>See Answer</summary>
                <p>{answer}</p>
            </details>
        </PDFQuetionAnsListItem>
    )
}

export default QuestionAnswerBlock