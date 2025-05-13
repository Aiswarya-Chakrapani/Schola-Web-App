import { IoIosArrowForward } from "react-icons/io"
import {
    TechNewsListItem,
    TechNewsImg,
    AuthorText,
    TechContentBox,
    TechNewsTitle,
    TechNewsDescription,
    TechNewsLinkBtn,
    FooterBlock,
    PublishedAtText,
} from './styledComponents.js'

const TechNewsItem = props => {
    const {news} = props
    console.log(news)
    const {title, author, description, publishedAt, url, urlToImage} = news
    function convertDateFormatWithTimestamp(timestampStr) {
        let datePart = timestampStr.split("T")[0];
        let parts = datePart.split("-");
        let formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        return formattedDate;
    }
    const publishedDate = convertDateFormatWithTimestamp(publishedAt)
    return (
        <TechNewsListItem>
                <TechNewsImg src={urlToImage} alt="technew" />
            <TechContentBox>
                <AuthorText> {author}'s </AuthorText>
                <TechNewsTitle> {title} </TechNewsTitle>
                <TechNewsDescription> {description} </TechNewsDescription>
                <FooterBlock>
                    <a href={url} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}} >
                    <TechNewsLinkBtn> 
                    See More
                    <IoIosArrowForward style={{marginLeft: '7px'}} />
                    <IoIosArrowForward />
                    </TechNewsLinkBtn>
                    </a>
                    <PublishedAtText> {publishedDate} </PublishedAtText>
                </FooterBlock>
            </TechContentBox>
        </TechNewsListItem>
    )
}

export default TechNewsItem