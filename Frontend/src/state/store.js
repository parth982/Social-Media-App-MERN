import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  token: null,
  posts: [],
  isLogged: false,

  setIsLogged: () => {
    set((store) => ({ isLogged: !store.isLogged }));
  },

  setLogin: (user, token) => {
    set({
      user,
      token,
    });
  },
  setLogout: () => {
    set({
      user: null,
      token: null,
    });
  },
  setFriends: (friends) => {
    set((state) => {
      if (state.user) {
        state.user.friends = friends;
      } else {
        console.error("user friends non-existent :(");
      }
    });
  },
  setPosts: (posts) => {
    set({
      posts,
    });
  },
  setPost: (updatedPost) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      ),
    }));
  },
}));

export default useStore;
