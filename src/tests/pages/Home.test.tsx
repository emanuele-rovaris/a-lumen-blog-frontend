import {describe, Mock, vi} from "vitest";
import {postsStub} from "@/tests/stubs/post.stub";
import axios from "axios";
import {render, screen, waitFor} from "@testing-library/react";
import {Home} from "@/pages";
import React from "react";
import {RenderRouteWithOutletContext} from "../utils/outlet-context.utils";
import {AnyAction} from "redux";
import {useDispatch} from "react-redux";

describe('Home page', () => {
    const fakeData = postsStub();
    const mockOutletContextData = {setLoading: () => true};

    vi.mock("react-redux", async () => {
        const actual: any = await vi.importActual("react-redux");
        return {
            ...actual,
            useDispatch: vi.fn(),
        }
    });
    const dispatchResultRecorder = {} as any;
    const fakeDispatch = (action: AnyAction) => {
        dispatchResultRecorder[action.type] = action.payload;
    };
    const useDispatchMock = useDispatch as Mock;
    useDispatchMock.mockImplementation(() => fakeDispatch);


    it('should retrieve and render posts list', async () => {
        vi.spyOn(axios, "get").mockImplementation(() =>
            Promise.resolve({data: fakeData}),
        );
        render(
            <RenderRouteWithOutletContext context={mockOutletContextData}>
                <Home/>
            </RenderRouteWithOutletContext>
        );
        const firstPost = await waitFor(() => screen.getByText(fakeData[0].title))
        expect(firstPost).toBeInTheDocument();
    });

    it('should not render posts if api fails and dispatch redux action', async () => {
        useDispatchMock.mockClear();
        vi.spyOn(axios, "get").mockImplementation(() =>
            Promise.reject({message: 'Error'}),
        );
        render(
            <RenderRouteWithOutletContext context={mockOutletContextData}>
                <Home/>
            </RenderRouteWithOutletContext>
        );
        const firstPost = await waitFor(() => screen.queryByText(fakeData[0].title));
        expect(firstPost).toBeNull();
        expect(useDispatchMock).toHaveBeenCalledTimes(1);
        expect(dispatchResultRecorder['notification/setNotificationAction'])
            .toEqual({status: 'error', open: true, message: 'Error retrieving posts!\nError'});
    });
});