import { Component } from "react"
import Navbar from '../Navbar'
import TechNewsItem from "../TechNewsItem/index.js"
import {
    TechNewsMainPage,
    TechNewsPageBody,
    TechNewsList,
} from './styledComponents.js'

class TechNews extends Component {
    state = {
        technewsArr: [],
    }

    getTechNewsApi = async () => {
        const apiKey = '66639369b077470ab8f2fe9c2c020216';
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`;
        const response = await fetch(apiUrl)
        const data = await response.json()
        const arr = data.articles.filter(each => each.author != null)
        this.setState({
            technewsArr: arr,
        })
        console.log(arr)
    }

    componentDidMount () {
        this.getTechNewsApi()
    }

    render () {
        const {technewsArr} = this.state
        return (
            <TechNewsMainPage>
                <Navbar selectedMenu='technews' />
                <TechNewsPageBody>
                    <TechNewsList>
                        {technewsArr.map(each => (
                            <TechNewsItem news={each} />
                        ))}
                    </TechNewsList>
                </TechNewsPageBody>
            </TechNewsMainPage>
        )
    }
}

export default TechNews