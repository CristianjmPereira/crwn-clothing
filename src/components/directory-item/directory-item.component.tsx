import { useNavigate } from "react-router-dom";
import { DirectoryCategory } from "../directory/directory.component";
import { BackgroundImage, DirectoryItemBody, DirectoryItemContainer } from "./directory-item.styles";

export type DirectoryItemProps = {
    category: DirectoryCategory
}

const DirectoryItem = ({ category }: DirectoryItemProps) => {
    const {title, imageUrl, route} = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);


    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <DirectoryItemBody>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </DirectoryItemBody>
        </DirectoryItemContainer>
    );
};


export default DirectoryItem;