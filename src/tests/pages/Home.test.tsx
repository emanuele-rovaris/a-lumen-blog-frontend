import {afterEach, describe, Mock, vi} from "vitest";
import {postsStub} from "@/tests/stubs/post.stub";
import axios from "axios";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {Home} from "@/pages";
import React from "react";
import {RenderRouteWithOutletContext} from "../utils/outlet-context.utils";
import {AnyAction} from "redux";
import {useDispatch} from "react-redux";
import * as router from "react-router-dom";
import {useNavigate} from "react-router-dom";

describe('Home page', () => {
    const fakeData = postsStub();
    const mockOutletContextData = {setLoading: () => true};

    // Redux setup
    vi.mock("react-redux", async () => {
        const actual: any = await vi.importActual("react-redux");
        return {
            ...actual,
            useDispatch: vi.fn(),
            useSelector: vi.fn(),
        }
    });

    const dispatchResultRecorder: { [key: string]: any } = {};
    const fakeDispatch = (action: AnyAction) => {
        dispatchResultRecorder[action.type] = action.payload;
    };
    const useDispatchMock = useDispatch as Mock;
    useDispatchMock.mockImplementation(() => fakeDispatch);

    // Routing setup
    vi.mock("react-router-dom", async () => {
        const actual: any = await vi.importActual("react-router-dom")
        return {
            ...actual,
            useNavigate: () => vi.fn().mockImplementation((e: string) => {
                console.log(e)
            }),
        }
    });

    it('should retrieve and render posts list', async () => {
        vi.spyOn(axios, "get").mockImplementationOnce(() =>
            Promise.resolve({data: fakeData}),
        );
        render(
            <RenderRouteWithOutletContext context={mockOutletContextData}>
                <Home/>
            </RenderRouteWithOutletContext>
        );
        const firstPost = await waitFor(() => screen.getByText(fakeData[0].title));
        expect(firstPost).toBeInTheDocument();
    });

    it('should not render posts if api fails and dispatch redux action', async () => {
        vi.spyOn(axios, "get").mockImplementationOnce(() =>
            Promise.reject({message: 'Error'}),
        );
        render(
            <RenderRouteWithOutletContext context={mockOutletContextData}>
                <Home/>
            </RenderRouteWithOutletContext>
        );
        const firstPost = await waitFor(() => screen.queryByText(fakeData[0].title));
        expect(firstPost).toBeNull();
        expect(useDispatchMock).toHaveBeenCalled();
        expect(dispatchResultRecorder['notification/setNotificationAction'])
            .toEqual({status: 'error', open: true, message: 'Error retrieving posts!\nError'});
    });

    it('should navigate to post-detail detail on click', async () => {
        vi.spyOn(axios, "get").mockImplementationOnce(() =>
            Promise.resolve({data: fakeData}),
        );
        vi.spyOn(router, 'useNavigate');
        render(
            <RenderRouteWithOutletContext context={mockOutletContextData}>
                <Home/>
            </RenderRouteWithOutletContext>
        );
        const firstPost = await waitFor(() => screen.getByText(fakeData[0].title));
        fireEvent.click(firstPost);
        expect(useNavigate).toHaveBeenCalled();
    });
});