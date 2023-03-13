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
        const title = screen.getByText(post.title);
        const text = screen.getByText(post.text);
        const userPicture = screen.getByRole('img')
        const userName = screen.getByText(post.user.full_name);
        expect(title).toBeInTheDocument();
        expect(text).toBeInTheDocument();
        expect(userPicture).toHaveAttribute('src', post.user.picture);
        expect(userName).toBeInTheDocument();
    });

    it('should call onClick function', () => {
        fireEvent.click(screen.getByRole('img'));
        expect(handleClick).toHaveBeenCalledWith(1);
    });
});