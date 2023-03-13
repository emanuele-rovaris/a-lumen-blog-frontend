import {beforeEach, describe, expect, vi} from 'vitest';
import {fireEvent, render, screen} from "@testing-library/react";
import {Card} from "@/components";
import {postsStub} from "@/tests/stubs/post.stub";

describe('Card component', () => {
    const post = postsStub()[0];
    const handleClick = vi.fn();

    beforeEach(() => {
        render(<Card card={post} click={handleClick}/>);
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

    it('should call onClick function', () => {
        fireEvent.click(screen.getByRole('img'));
        expect(handleClick).toHaveBeenCalledWith(1);
    });
});