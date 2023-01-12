import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Route, Routes } from 'react-router-dom';
import LoginJoin from './pages/LoginJoin';
import TodoPage from './pages/TodoPage';
function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App w-screen">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<TodoPage/>}></Route>
          <Route path='/auth/*' element={<LoginJoin/>}></Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
