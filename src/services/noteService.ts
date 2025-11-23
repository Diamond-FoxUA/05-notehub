import axios from 'axios';
import type { Note, NewNote } from '../types/note';

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesProps {
  query: string;
  page: number;
}

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api/',
  headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
});

export async function fetchNotes({ query, page }: FetchNotesProps): Promise<NotesHttpResponse> {
  const response = await api.get<NotesHttpResponse>('/notes', {
    params: { search: query, page, perPage: 12 },
  });
  return response.data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const response = await api.post<Note>('/notes', newNote);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}
