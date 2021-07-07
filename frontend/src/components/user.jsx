function User({ user, updateDocument, deleteDocument }) {
  return (
    <div className="row">
      <img
        src="https://image.freepik.com/vetores-gratis/perfil-de-avatar-de-homem-no-icone-redondo_24640-14044.jpg"
        alt="Avatar"
      />
      <div className="personalData">
        <h3>{user.name}</h3>
        <h4>{user.email}</h4>
      </div>
      <div className="action">
        <button
          onClick={() => {
            updateDocument(...user);
          }}
        >
          Alterar
        </button>
        <button
          onClick={() => {
            deleteDocument(...user);
          }}
        >
          Deletar
        </button>
      </div>
    </div>
  );
}

export default User;
