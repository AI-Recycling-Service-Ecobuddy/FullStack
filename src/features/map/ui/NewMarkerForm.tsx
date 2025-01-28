export default function NewMarkerForm() {
  return (
    <div className='flex h-[200px] w-full flex-col items-center'>
      <h2 className='text-2xl font-bold'>마커 추가하기</h2>
      <form className='mt-4 flex w-1/2 flex-col'>
        <div className='flex w-full items-center justify-center'>
          <label htmlFor='title' className='text-lg font-bold'>
            제목
          </label>
          <input
            type='text'
            id='title'
            name='title'
            className='mt-1 rounded-md border-2 border-gray-300 p-2'
          />
          <label htmlFor='location' className='mt-4 text-lg font-bold'>
            위치
          </label>
          <input
            type='text'
            id='location'
            name='location'
            className='mt-1 rounded-md border-2 border-gray-300 p-2'
          />
        </div>
        <label htmlFor='imageUrl' className='mt-4 text-lg font-bold'>
          이미지 URL
        </label>
        <input
          type='text'
          id='imageUrl'
          name='imageUrl'
          className='mt-1 rounded-md border-2 border-gray-300 p-2'
        />
        <button
          type='submit'
          className='mt-4 rounded-md bg-blue-500 py-2 font-bold text-white'
        >
          추가하기
        </button>
      </form>
    </div>
  );
}
