import {
    AggregateController,
    NoteController,
    PageController,
    PostController,
    CategoryController,
    createClient,
    SnippetController,
    AIController
} from '@mx-space/api-client';
import { fetchAdaptor } from '@mx-space/api-client/dist/adaptors/fetch';

import { mxConfig } from '@/config';

export const apiClient = createClient(fetchAdaptor)(mxConfig.endpoint, {
    controllers: [
        PostController,
        NoteController,
        PageController,
        CategoryController,
        AggregateController,
        SnippetController,
        AIController
    ]
});