import {beforeEach, describe, expect} from 'vitest';
import {render, screen} from "@testing-library/react";
import {Card} from "@/components";
import {postsStub} from "@/tests/stubs/post.stub";

describe('Card', () => {
    const post = postsStub()[0];

    beforeEach(() => {
        render(<Card card={post} click={() => {
            console.log('click');
        }}/>);
    });

    it('should render the component', () => {
        const cardTitle = screen.getByText(post.title);
        const cardText = screen.getByText(post.text);
        const cardUserPicture = screen.getByRole('img')
        const cardUserName = screen.getByText(post.user.full_name);
        expect(cardTitle).toBeInTheDocument();
        expect(cardText).toBeInTheDocument();
        expect(cardUserPicture).toHaveAttribute('src', post.user.picture);
        expect(cardUserName).toBeInTheDocument();
    });
});